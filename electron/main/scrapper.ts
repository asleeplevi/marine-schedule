import { BrowserWindow, ipcMain } from 'electron'
import puppeteer, { Browser, Page } from 'puppeteer-core'

type SchedulingInteresteds = {
  identifier: string
  name: string
  service: string
  gru: number
}

type Scheduling = {
  organization: {
    nidom: string
    name: string
  }
  forwardingAgent: {
    name: string
    identifier: string
  }
  interesteds: SchedulingInteresteds[]
  date?: Date
  captcha?: string
}

type StatusScrapper = 'closed' | 'ready' | 'openning'

export class Scrapper {
  private browser?: Browser
  private page?: Page
  private BASE_URL = 'https://sistemas.dpc.mar.mil.br/sisap/agendamento/'
  private status: StatusScrapper = 'closed'
  private mainWindow: BrowserWindow

  setMainWindow(newWindow: BrowserWindow) {
    this.mainWindow = newWindow
  }

  private async delay(time: number) {
    await new Promise(resolve => setTimeout(resolve, time))
  }

  async get(route: string): Promise<string> {
    const page = this.page
    if (!page) throw new Error('Scrapper não iniciado')

    return await page.evaluate(
      (BASE_URL, route) => {
        return new Promise<string>((resolve, reject) => {
          fetch(`${BASE_URL}/server/${route}`)
            .then(res => res.text())
            .then(text => resolve(text))
            .catch(err => reject(err))
        })
      },
      this.BASE_URL,
      route
    )
  }

  async start(headless: boolean = true) {
    if (this.status !== 'closed') return
    this.status = 'openning'
    this.browser = await puppeteer.launch({
      channel: 'chrome',
      headless,
    })

    this.page = await this.browser.newPage()
    this.status = 'ready'
    await this.page.goto(this.BASE_URL, { waitUntil: 'networkidle2' })
  }

  async selectOrganizationAndClickOnSchedule(selectedOrganization: string) {
    if (!this.page) return

    const page = this.page
    await page.goto(this.BASE_URL, { waitUntil: 'networkidle2' })

    await page.waitForNetworkIdle()
    const selectOrganization = await page.waitForSelector('.q-select', {
      visible: true,
    })
    selectOrganization?.click()

    await this.delay(1000) // await select open
    const organizations = await page.$$('.q-item')

    for (const organization of organizations) {
      const text = (await organization.getProperty('innerHTML'))
        .toString()
        .toLocaleUpperCase()
      if (text.includes(selectedOrganization.toLocaleUpperCase())) {
        await organization.click()
      }
    }

    await page.waitForSelector('.acoesHome .titleacord')

    const mainOptions = await page.$$('.acoesHome .titleacord')

    const scheduleOptionIndex = mainOptions.length > 100 ? 201 : 2
    const scheduleOption = mainOptions[scheduleOptionIndex]
    await scheduleOption.click()

    await this.delay(500)
    const scheduleButton = await scheduleOption.waitForSelector('.btnAcaoForm')

    await scheduleButton?.click()
  }

  async agreeRulesAndClickOnNext() {
    if (!this.page) return
    const page = this.page

    const acceptTermsCheckbox = await page.waitForSelector('#checkorientacoes')
    await acceptTermsCheckbox?.click()

    const nextButton = await page.waitForSelector('.stepper-button.next')

    await nextButton?.click()
  }

  async fillRepresentativeDataAndClickNext(identifier: string) {
    if (!this.page) return
    const page = this.page

    const selectTypeButton = await page.waitForSelector(
      '#tipoSelectRepresentante'
    )
    await selectTypeButton?.click()
    const identifierOnlyNumbers = identifier.replace(/\W+/gi, '')
    const identifierType = identifierOnlyNumbers.length > 11 ? 2 : 1

    await this.delay(1000)
    const typeOptions = await page.$$('.q-popover .q-list .q-item')
    if (!typeOptions) throw new Error('error on step 3')
    await typeOptions[identifierType].click()

    await page.waitForSelector('#cpfcnpjRepresentante input', {
      visible: true,
    })

    await page.type(
      '#cpfcnpjRepresentante input',
      `  ${identifierOnlyNumbers}`,
      {
        delay: 150,
      }
    )

    const nextButton = await page.waitForSelector('.stepper-button.next')
    await nextButton?.click()
  }

  async addInterestedAndClickNext(interesteds: SchedulingInteresteds[]) {
    if (!this.page) return
    const page = this.page

    await page.waitForNetworkIdle()
    const addInterestedButton = await page.waitForSelector('.q-btn-item')
    await addInterestedButton?.click()

    for (let index = 0; index < interesteds.length; index++) {
      const interested = interesteds[index]
      await addInterestedButton?.click()

      const identifierOnlyNumbers = interested.identifier.replace(/\W+/gi, '')
      const identifierType = identifierOnlyNumbers.length > 11 ? 2 : 1

      const currentLineIndex = index * 2
      const gruLines = await page.$$('.linhagru')
      const currentLine = gruLines[currentLineIndex]
      const inputs = await currentLine.$$('.relative-position')

      const selectIdentifierOptions = inputs[1]

      await selectIdentifierOptions.click()

      //----------------/ fullfill interested data

      await this.delay(1000)
      await page.waitForSelector('.q-popover .q-list')
      const typeOptions = await page.$$('.q-popover .q-list .q-item')
      await typeOptions[identifierType].click()

      const clickOutside = async () =>
        (await page.$('.quantidadeServ'))?.click()

      const identifierInput = await currentLine.waitForSelector(
        '.nCpfcnpj input'
      )

      await identifierInput?.type(identifierOnlyNumbers, {
        delay: 150,
      })

      await clickOutside()

      await page.evaluate(index => {
        const button = document
          .querySelectorAll('.linhagru')
          [index].querySelector('.addNewServic') as any
        button.click()
      }, currentLineIndex)

      await page.waitForNetworkIdle()

      await this.delay(500)

      // -------------- fullfill GRU data

      const gruInput = await currentLine.waitForSelector('.divngru input')
      await gruInput?.type(String(interested.gru), { delay: 150 })
      await clickOutside()
      await page.waitForNetworkIdle()

      const serviceLine = await currentLine.$('.linhagru')
      const serviceSelect = await serviceLine?.$('.q-select')

      await serviceSelect?.click()

      await this.delay(500) // wait select open
      //------------------ /// select service

      const services = await page.$$('.q-list .q-item')
      for (let index = 0; index < services.length; index++) {
        const service = services[index]
        const serviceTextContent = await service.getProperty('textContent')

        const [, content] = String(serviceTextContent)
          .toLocaleUpperCase()
          .split(':')

        if (content === interested.service.toLocaleUpperCase()) {
          await service.click()
        }
      }

      await page.waitForNetworkIdle()
      await this.delay(500)
    }

    const nextButton = await page.waitForSelector('.stepper-button.next')
    await nextButton?.click()
  }

  private async goToSelectedMonth(
    nextMonthButton: puppeteer.ElementHandle<Element>,
    selectedMonth: number
  ) {
    const page = this.page
    if (!page) return
    const currentMonthElement = await page.$('.q-card-main span')
    const currentMonthInnerHTML = await currentMonthElement?.getProperty(
      'innerHTML'
    )

    const currentMonthText = currentMonthInnerHTML?.toString() || ''

    const [, currentMonthAndYear] = currentMonthText.split(':')
    const [month] = currentMonthAndYear.split('/')
    if (parseInt(month) < selectedMonth) {
      await nextMonthButton.click()
      await page.waitForNetworkIdle()
      this.goToSelectedMonth(nextMonthButton, selectedMonth)
    }
  }

  async selectDateAnClickNext(date: Date) {
    const page = this.page
    if (!page) return
    await page.waitForNetworkIdle()

    const monthButtons = await page.$$('.q-card-main .q-btn-rectangle')
    const nextMonthButton = monthButtons[1]

    await this.goToSelectedMonth(nextMonthButton, date.getMonth() + 1)

    const selectedDateDay = date.getDate()
    const calendarDays = await page.$$(
      '.q-card-main .cal-body .dates .item.event'
    )

    for (let index = 0; index < calendarDays.length; index++) {
      const dayElement = calendarDays[index]
      const dayElementText = await dayElement.getProperty('textContent')
      const [, dayText] = dayElementText.toString().split(':')

      if (dayText.trim() === String(selectedDateDay)) {
        await dayElement.click()
      }
    }

    const hoursContainer = await page.$$('.col-md-8 .q-card-main .row .col')
    const morningContainer = hoursContainer[0 * 2]
    const afternoonContainer = hoursContainer[1 * 2]
    const currentContainer =
      date.getHours() > 12 ? afternoonContainer : morningContainer

    const availableHours = await currentContainer.$$('.group > div')

    for (let index = 0; index < availableHours.length; index++) {
      const hourElement = availableHours[index]
      const hourElementTextContent = (
        await hourElement.getProperty('textContent')
      ).toString()

      const [, hour] = hourElementTextContent.split('_checked')

      const selectedHour = String(date.getHours())
      const selectedMinutes = String(date.getMinutes())

      const hoursAndMinutes = `${selectedHour.padStart(
        2,
        '0'
      )}:${selectedMinutes.padStart(2, '0')}`

      if (hour === hoursAndMinutes) {
        const checkbox = await hourElement.waitForSelector('.q-option-inner')
        await checkbox?.click()
      }
    }

    const nextButton = await page.waitForSelector('.stepper-button.next')
    await nextButton?.click()
  }

  async getCaptcha() {
    const page = this.page
    if (!page) return
    await page.waitForNetworkIdle()

    const captchaProperties = await page.evaluate(() => {
      const element = document.querySelector('#captchaimage') as any
      const qLayout = document.querySelector('.q-layout') as any
      qLayout.style.position = 'unset'

      element.style.position = 'absolute'
      element.style.left = '0'
      element.style.top = '0'

      return {
        width: element.clientWidth as number,
        height: element.clientHeight as number,
      }
    })

    await this.delay(1000)

    const response = await page?.screenshot({
      encoding: 'base64',
      clip: {
        ...captchaProperties,
        x: 0,
        y: 0,
      },
    })

    if (!response) throw new Error('Não foi possível localizar o captcha')

    return response.toString()
  }

  async renewCaptcha() {
    const page = this.page
    if (!page) return

    const renewButton = await page.$('.row.xs-gutter .q-icon')
    await renewButton?.click()

    await page.waitForNetworkIdle()

    const response = await page?.screenshot({
      encoding: 'base64',
      clip: {
        width: 166,
        height: 75,
        x: 0,
        y: 0,
      },
    })

    if (!response) throw new Error('Não foi possível localizar o captcha')

    return response.toString()
  }

  async fillCaptchaAndCheckTerms(text: string) {
    const page = this.page
    if (!page) return

    await page.waitForNetworkIdle()

    const checkbox = await page.waitForSelector('.q-checkbox-icon')

    await checkbox?.click()

    await page.type('#captchainput input', text, { delay: 150 })
    const nextButton = await page.waitForSelector('.stepper-button.next')
    await nextButton?.click()
  }

  async createSchedule(schedule: Scheduling) {
    if (!schedule.date) throw new Error('Data não especificada')
    const emitStatusMessage = (message: string) =>
      this.mainWindow.webContents.send('creating-schedule-status', message)

    emitStatusMessage('Selecionando capitania')
    await this.selectOrganizationAndClickOnSchedule(schedule.organization.name)
    emitStatusMessage('Concordando com os termos')
    await this.agreeRulesAndClickOnNext()
    emitStatusMessage('Preenchendo dados do representante')
    await this.fillRepresentativeDataAndClickNext(
      schedule.forwardingAgent.identifier
    )
    emitStatusMessage('Preenchendo dados dos interessados')
    await this.addInterestedAndClickNext(schedule.interesteds)
    emitStatusMessage('Selecionando data e hora')
    await this.selectDateAnClickNext(new Date(schedule.date))

    emitStatusMessage('Carregando captcha')
    const captcha = await this.getCaptcha()
    emitStatusMessage('')
    return captcha
  }
}
