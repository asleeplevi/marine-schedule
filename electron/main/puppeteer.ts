import puppeteer from 'puppeteer-core'

type ScrapperStatusProps = 'ready' | 'closed'

export function Scrapper() {
  const BASE_URL = 'https://sistemas.dpc.mar.mil.br/sisap/agendamento/'
  let browser: puppeteer.Browser
  let page: puppeteer.Page
  let status: ScrapperStatusProps = 'closed'

  async function get(route: string): Promise<string> {
    return await page.evaluate(
      (BASE_URL, route) => {
        return new Promise<string>((resolve, reject) => {
          fetch(`${BASE_URL}/server/${route}`)
            .then(res => res.text())
            .then(text => resolve(text))
            .catch(err => reject(err))
        })
      },
      BASE_URL,
      route
    )
  }

  function close() {
    status = 'closed'
    browser.close()
  }

  async function start(headless: boolean) {
    browser = await puppeteer.launch({
      channel: 'chrome',
      headless,
    })
    page = await browser.newPage()
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
    status = 'ready'
  }

  async function reload() {
    await page.reload()
  }

  return { get, start, close, reload, status }
}
