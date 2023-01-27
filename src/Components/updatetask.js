import "./addTask.css";
import todoContext from "../store/store";
import { useContext, useState } from "react";

const UpdateTask = (props) => {
  const [title, setTitle] = useState(props.data.name);
  const [status, setStatus] = useState(props.data.status);

  const ctx = useContext(todoContext);

  const closeAddTask = () => {
    ctx.closeAddTask();
  };

  const statusHandler = (event) => {
    setStatus(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const updateTaskHandler = () => {
    if (!title.trim().length) {
      ctx.showErrorMsg1();
    } else {
      ctx.updatetaskData({ name: title, status, date: new Date() });
      ctx.closeAddTask();
    }
  };

  return (
    <div className="todo-cont">
      <h3>Update TODO</h3>
      <section className="todo-props">
        <label>Title</label>
        <input type="text" onChange={titleHandler} value={title} />
        <label>Status</label>
        <select onChange={statusHandler} value={status}>
          <option value="IC">Incomplete</option>
          <option value="C">Completed</option>
        </select>
      </section>
      <section className="todo-actions">
        <button onClick={updateTaskHandler}>Update Task</button>
        <button onClick={closeAddTask}>Cancel</button>
      </section>
    </div>
  );
};

export default UpdateTask;
