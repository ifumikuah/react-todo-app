import { useState, createContext } from "react"
import Button from "./Components/Button/Button"

export const ThemeContext = createContext(null)

export default function ToggleDarkmode() {
  const [isDark, setIsDark] = useState(false)

  function toggle() {
    setIsDark( prev => !prev )
    document.body.id = isDark ? "" : "dark"
  }

  return <>
    <ThemeContext.Provider value={ isDark }>
      <Button></Button>
    </ThemeContext.Provider>
  </> 
}