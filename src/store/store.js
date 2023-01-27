import React from "react";

const todoContext = React.createContext({
  closeAddTask: () => {},
  data: [],
  updatetask: () => {},
  showSucMsg1: () => {},
  showErrorMsg1: () => {},
  deleteTodo: () => {},
  updateStatus: () => {},
  updateStatusTrue: () => {},
  updateTodoList: () => {},
  updatetaskData: () => {},
});

export default todoContext;
