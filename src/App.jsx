import { useEffect, useState, createContext } from "react"
import TodoList from "./TodoList";
import './App.css'

export const ThemeContext = createContext();

export default function App () {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme( prev => {
      if (prev === "light") {
        document.body.id = "dark"
        return "dark"
      }
      document.body.id = "light"
      return "light"
    })
  }

  useEffect(() => {
    document.body.id = theme
  }, [])

  return (
    <ThemeContext.Provider value={ theme }>
      <TodoList/>
      <div className="ThemeSwitcher" onClick={toggleTheme}>
        <span className="material-symbols-rounded">
          {theme === "light" ? "dark_mode" : "light_mode"}
        </span>
      </div>
    </ThemeContext.Provider>
  )
}