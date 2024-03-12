import { useState, createContext } from "react";
import "./App.css";
import Button from "./Components/Button/Button";
import ButtonSymbol from "./Components/ButtonSymbol/ButtonSymbol";
import InputText from "./Components/InputText/InputText";
import TaskItem from "./Components/TaskItem/TaskItem";
import ButtonLabel from "./Components/ButtonLabel/ButtonLabel";

export const ThemeContext = createContext(null);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [list, setList] = useState([]);

  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")

  function handleNameInput(e) {
    setName( e.target.value )
  }

  function addTask() {
    if (name.trim()) {      
      const store = {
        id: list.length,
        name: name,
        active: true
      }
  
      setList( prev => [...prev, store] )
      setName("")
    }
  }

  function toggleDarkmode() {
    setIsDark(prev => !prev);
    document.body.id = isDark ? "" : "dark";
  }

  function toggleSearch() {
    setSearch( prev => !prev)
  }

  function toggle(key) {
    setList((prev) => {
      return prev.map((item) =>
        key === item.id ? { ...item, active: item.active ? false : true } : item
      );
    });
  }

  function getRemainingTask() {
    return list.filter( task => !task.active ).length
  }

  function listFilters() {
    if (search) {
      return list.filter( ({name}) => name.toLowerCase().startsWith(searchQuery.toLowerCase()) )
    }

    if (filter === "active") {
      return list.filter( task => task.active )
    } else if (filter === "done") {
      return list.filter( task => !task.active )
    }
    return list
  }

  function setFilters(e) {
    setFilter(e.target.innerText)
  }

  function searchTask(e) {
    setSearchQuery(e.target.value)
  }

  function deleteTask(key) {
    setList( list.filter(( {id} ) => id !== key) )
  }

  return (
    <ThemeContext.Provider value={isDark}>
      <div className="App">
        <div className="App_header">
          <h1>todo</h1>
        </div>
        <div className="App_body">
          <div className="inputs">
            {
              search ? <>
                <InputText placeholder={"Search..."} onChange={searchTask} value={searchQuery}/>
              </> : <>
                <InputText placeholder={"New task..."} value={name} onChange={handleNameInput}/>
                <Button onClick={addTask}>Add</Button>
              </>
            }
          </div>
          <div className="taskList">
            {listFilters().map((item, index) => {
              return (
                <TaskItem
                  itemState={item.active}
                  customClass={"taskItem"}
                  key={index}
                  togglerOnClick={() => toggle(item.id)}
                >
                  <p className="itemName">{item.name}</p>
                  <ButtonSymbol onClick={() => deleteTask(item.id)}>delete</ButtonSymbol>
                </TaskItem>
              );
            })}
          </div>
          <div className="utility">
            <ButtonSymbol onClick={toggleSearch} customClass={search ? "searchon" : ""}>search</ButtonSymbol>
            <span className="remaining">{getRemainingTask()} of {list.length} task done</span>
            <div className="taskFilters">
              <ButtonLabel onClick={setFilters}>active</ButtonLabel>
              <ButtonLabel onClick={setFilters}>done</ButtonLabel>
              <ButtonLabel onClick={setFilters}>all</ButtonLabel>
            </div>
          </div>
        </div>
        <div className="App_footer">
          <div className="abouts">
            <h6>
              <span>2024</span> Muhammad Fadhil Suheri
            </h6>
            <p>
              Licensed under: MIT | {" "}
              <a
                style={{ color: "#399EE6", textDecoration: "none" }}
                className="sourceref"
                href="https://github.com/ifumikuah/react-todo-app"
              >
                Source
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="theme-container">
        <ButtonSymbol onClick={toggleDarkmode} customClass={"theme-switch"}>
          {isDark ? "dark_mode" : "light_mode"}
        </ButtonSymbol>
      </div>
    </ThemeContext.Provider>
  );
}
