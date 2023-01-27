import "./addTask.css";
import todoContext from "../store/store";
import { useContext, useState } from "react";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("IC");

  const ctx = useContext(todoContext);

  const closeAddTask = () => {
    ctx.closeAddTask();
  };

  const addTaskHandler = () => {
    if (!title.trim().length) {
      ctx.showErrorMsg1();
    } else {
      props.updateTask({
        name: title.trim(),
        status,
        date: new Date(),
      });
      setStatus("IC");
      setTitle("");
      ctx.closeAddTask();
      ctx.showSucMsg1();
    }
  };

  const statusHandler = (event) => {
    setStatus(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="todo-cont">
      <h3>Add TODO</h3>
      <section className="todo-props">
        <label>Title</label>
        <input type="text" onChange={titleHandler} />
        <label>Status</label>
        <select onChange={statusHandler}>
          <option value="IC">Incomplete</option>
          <option value="C">Completed</option>
        </select>
      </section>
      <section className="todo-actions">
        <button onClick={addTaskHandler}>Add Task</button>
        <button onClick={closeAddTask}>Cancel</button>
      </section>
    </div>
  );
};

export default AddTask;
