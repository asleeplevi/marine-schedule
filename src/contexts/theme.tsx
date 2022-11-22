import { createContext, useState } from 'react'

type ModeProps = 'dark' | 'light'

type ThemeContextProps = {
  mode: ModeProps
  setMode: (newMode: ModeProps) => void
  toggleMode: () => void
}

type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeContext = createContext({} as ThemeContextProps)
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ModeProps>('light')

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
