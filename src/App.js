import "./App.css";
import { useState, useContext, useEffect } from "react";
import AddTask from "./Components/addTask";
import UpdateTask from "./Components/updatetask";
import Backdrop from "./Components/backdrop";
import todoContext from "./store/store";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import TodoList from "./Components/todoList";

const App = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [showSucMsg, setSucMsg] = useState(false);
  const [showError, setError] = useState(false);
  const [showDelMsg, setShowDel] = useState(false);
  const ctx = useContext(todoContext);
  const [data, setData] = useState(ctx.data);
  const [filterCond, setFilterCond] = useState("");
  const [dataCopy, setDataCopy] = useState(data);
  const [showUpdateModal, setupdateModal] = useState(false);
  const [selectedTask, setSelTask] = useState("");
  const [showUpMsg, setUpMsg] = useState(false);

  useEffect(() => {
    if (filterCond === "C") {
      setDataCopy(() => data.filter((el) => el.status === "C"));
    } else if (filterCond === "IC") {
      setDataCopy(() => data.filter((el) => el.status === "IC"));
    } else {
      setDataCopy(data);
    }
  }, [filterCond, data]);

  const openAddTask = () => {
    setAddTaskModal((prev) => !prev);
  };

  const updateTask = (obj) => {
    setData((prev) => [obj, ...prev]);
  };

  const closeAddTask = () => {
    setAddTaskModal(() => false);
    setupdateModal(() => false);
  };

  const showSucMsg1 = () => {
    setSucMsg(true);
    setTimeout(() => {
      setSucMsg(false);
    }, 2500);
  };

  const showErrorMsg1 = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500);
  };

  const filterDataHandler = (event) => {
    setFilterCond(event.target.value);
  };

  const deleteTodo = (index) => {
    setData((prev) => prev.filter((el,i) => i !== index));
    setShowDel(true);
    setTimeout(() => {
      setShowDel(false);
    }, 2500);
  };

  const updateStatus = (index) => {
    let data1 = data.map((el,i) => {
      if (i === index) {
        el.status = "C";
      }
      return el;
    });
    setData(data1);
    setUpMsg(true);
    setTimeout(() => {
      setUpMsg(false);
    }, 2500);
  };

  const updateStatusTrue = (index) => {
    let data1 = data.map((el,i) => {
      if (i === index) {
        el.status = "IC";
      }
      return el;
    });
    setData(data1);
    setUpMsg(true);
    setTimeout(() => {
      setUpMsg(false);
    }, 2500);
  };

  const updatetaskData = (obj) => {
    let data1 = data.map((el,i) => {
      if (i === selectedTask.index) {
        el.name = obj.name;
        el.status = obj.status;
        el.date = obj.date;
      }
      return el;
    });
    setData(data1);
    setUpMsg(true);
    setTimeout(() => {
      setUpMsg(false);
    }, 2500);
  };

  const updateTodoList = (obj) => {
    setupdateModal(true);
    setSelTask(obj);
  };

  return (
    <todoContext.Provider
      value={{
        closeAddTask,
        showSucMsg1,
        showErrorMsg1,
        deleteTodo,
        updateStatus,
        updateStatusTrue,
        updateTodoList,
        updatetaskData,
      }}
    >
      <div className="cont">
        <h1>TO DO LIST</h1>
        <div className="behv-cont">
          <div onClick={openAddTask}>Add Task</div>
          <select onClick={filterDataHandler}>
            <option value="A">All</option>
            <option value="IC">Incomplete</option>
            <option value="C">Complete</option>
          </select>
        </div>
        <section className={dataCopy.length ? "todo-list" : "todo-list center"}>
          {dataCopy.length ? (
            <TodoList data={dataCopy}></TodoList>
          ) : (
            <div className="notodos">No Todos</div>
          )}
        </section>
      </div>
      {addTaskModal && <AddTask updateTask={updateTask}></AddTask>}
      {showUpdateModal && <UpdateTask data={selectedTask}></UpdateTask>}
      {addTaskModal && <Backdrop></Backdrop>}
      {showUpdateModal && <Backdrop></Backdrop>}
      <div className={showSucMsg ? "msg show" : "msg"}>
        <TiTick className="add" />
        Task Added Successfully
      </div>

      <div className={showError ? "msg show" : "msg"}>
        <RxCross2 className="error" />
        Please enter a title
      </div>

      <div className={showDelMsg ? "msg show" : "msg"}>
        <TiTick className="add" />
        Deleted Successfully
      </div>

      <div className={showUpMsg ? "msg show" : "msg"}>
        <TiTick className="add" />
        Task Updated Successfully
      </div>
    </todoContext.Provider>
  );
};

export default App;
