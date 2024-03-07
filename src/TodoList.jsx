import { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { ThemeContext } from "./App";
import Button from "./Button";

export default function TodoList() {
  const theme = useContext(ThemeContext);

  const [task, setTask] = useState([]);
  const [taskname, setTaskname] = useState("");
  const [taskdesc, setTaskdesc] = useState("");
  const [ongoing, setOngoing] = useState(true);

  const [selectedTaskname, setSelectedTaskname] = useState("");
  const [selectedTaskdesc, setSelectedTaskdesc] = useState("");
  const [selectedTaskid, setSelectedTaskid] = useState();

  useEffect(() => {}, [selectedTaskname, selectedTaskdesc]);

  const addTask = () => {
    if (taskname.trim(" ")) {
      const store = {
        id: task.length,
        name: taskname,
        description: taskdesc,
        ongoing: ongoing,
      };

      setTask((prevTask) => [...prevTask, store]);
      setTaskname("");
    }
  };

  const toggleOngoing = (key) => {
    setTask((prevTask) => {
      return prevTask.map((task, index) =>
        key === index ? { ...task, ongoing: task.ongoing ? false : true } : task
      );
    });
  };

  const editTaskname = (e) => {
    setSelectedTaskname(e.target.value);
  };

  const editDesc = (e) => {
    setSelectedTaskdesc(e.target.value);
  };

  const applyEditTask = () => {
    const store = {
      id: selectedTaskid,
      name: selectedTaskname,
      description: selectedTaskdesc,
      ongoing: ongoing,
    };

    setTask((prevTask) => {
      return prevTask.map((task, index) => (store.id === index ? store : task));
    });
    setIsOpen(false);
  };

  const discardEditTask = () => {
    setTask(task);
    setIsOpen(false);
  };

  const deleteTask = () => {
    setTask((prevTask) => prevTask.filter((_, i) => i !== selectedTaskid));
  };

  // for modals below

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      border: "none",
      borderRadius: "1rem",
      transform: "translate(-50%, -50%)",
      padding: window.innerWidth < 600 ? "16px" : "32px",
      backgroundColor: theme === "light" ? "#F4F2F3" : "#0c0920",
    },
  };

  Modal.defaultStyles.overlay.backgroundColor = "hsla(0, 0%, 0%, 0.6)";
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(task) {
    setIsOpen(task.id);

    const store = task;

    setSelectedTaskid(store.id);
    setSelectedTaskname(store.name);
    setSelectedTaskdesc(store.description);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // for modals above

  return (
    <div className="TodoList">
      <div className="TodoList_header">
        <h1>
          {" "}
          Todo{" "}
          {task.length ? (
            <span className="task_remaining">
              {task.filter((task) => !task.ongoing).length}/{task.length} task done
            </span>
          ) : (
            ""
          )}
        </h1>
      </div>
      <div className="TodoList_body">
        <div className="form_addtask">
          <input
            type="text"
            placeholder="Add new task..."
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
          />
          {window.innerWidth < 600 ? (
            <Button
              text={""}
              customclass={"mobile_addbtn"}
              icon={"add"}
              whenclick={addTask}
            />
          ) : (
            <Button text={"Add Task"} icon={"add"} whenclick={addTask} />
          )}
        </div>
        <div className="tasks_body">
          {task.length ? (
            ""
          ) : (
            <p className="notask"> {"Whoopsie, add a task first..."} </p>
          )}
          <ul>
            {task.map((task) => (
              <li
                key={task.id}
                className={`task_container ${
                  task.ongoing ? "task_ongoing" : "task_finished"
                }`}
              >
                <div className="task_maincontent">
                  <h4> {task.name} </h4>
                  <p> {task.description} </p>
                </div>
                <div className="task_buttons">
                  <Button
                    whenclick={() => openModal(task)}
                    text="Edit"
                    icon="edit"
                  />
                  <Button
                    whenclick={() => toggleOngoing(task.id)}
                    text={task.ongoing ? "Mark as done" : "Finished"}
                    icon={
                      task.ongoing
                        ? "radio_button_unchecked"
                        : "radio_button_checked"
                    }
                  />
                </div>
                <Modal
                  isOpen={modalIsOpen === task.id}
                  onRequestClose={closeModal}
                  style={modalStyles}
                  contentLabel="Modal"
                  ariaHideApp={false}
                >
                  <div className="modal">
                    <div className="modal_header">
                      <h2> Edit Task: {task.name} </h2>
                    </div>
                    <div className="modal_body">
                      <div className="task_modal_forms">
                        <div className="task_modal_title">
                          <p>Name</p>
                          <input
                            type="text"
                            placeholder="Add or modify task name"
                            value={selectedTaskname}
                            onChange={editTaskname}
                          />
                        </div>
                        <div className="task_modal_description">
                          <p>Description</p>
                          <textarea
                            rows={5}
                            placeholder="Add or modify task description"
                            value={selectedTaskdesc}
                            onChange={editDesc}
                          />
                        </div>
                      </div>
                      <div className="task_modal_buttons">
                        <Button
                          icon="check"
                          text="Apply"
                          whenclick={applyEditTask}
                        />
                        <Button
                          customstyle={{
                            marginLeft: "6px",
                            marginRight: "6px",
                          }}
                          icon="backspace"
                          text="Discard"
                          whenclick={discardEditTask}
                        />
                        <Button
                          customstyle={{ backgroundColor: "#dc3545" }}
                          icon={"delete"}
                          text="Delete"
                          whenclick={deleteTask}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
