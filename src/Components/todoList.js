import "./todoList.css";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { useContext } from "react";
import todoContext from "../store/store";

const TodoList = (props) => {
  const ctx = useContext(todoContext);

  return (
    <ul>
      {props.data.map((el, i) => {
        const date = el.date.toLocaleString();

        const onDeleteTodo = () => {
          ctx.deleteTodo(i);
        };

        const statusUpdateHandler = () => {
          ctx.updateStatus(el.name);
        };

        const statusUpdateHandlerTrue = () => ctx.updateStatusTrue(el.name);

        const updateTodoList = () => {
          ctx.updateTodoList({ name: el.name, status: el.status });
        };

        return (
          <li key={i}>
            <div className="todo-data_cont">
              <div className="div">
                <div>
                  {el.status === "C" && (
                    <input
                      type="checkbox"
                      className="check"
                      onClick={statusUpdateHandlerTrue}
                      defaultChecked
                    />
                  )}

                  {el.status === "IC" && (
                    <input
                      type="checkbox"
                      className="check"
                      onClick={statusUpdateHandler}
                    />
                  )}
                </div>
                <div>
                  <div
                    className={el.status === "IC" ? "title" : "title complete"}
                  >
                    {el.name}
                  </div>
                  <div>{date}</div>
                </div>
              </div>
              <div className="div">
                <button onClick={onDeleteTodo}>
                  <MdDelete className="icon" />
                </button>
                <button onClick={updateTodoList}>
                  <HiPencil className="icon" />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
