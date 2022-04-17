import { createSlice, current } from "@reduxjs/toolkit";

const createTask = (taskName) => {
  return {
    name: taskName,
    description: "",
  };
};

const removeProp = (key, obj) => {
  let copy = Object.assign({}, obj);
  delete copy[key];
  return copy;
};
const addTask = (key, obj, task) => {
  let copy = Object.assign({}, obj);
  let List = copy[key];
  List = [...List, createTask(task)];
  copy[key] = List;
  return copy;
};

export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    value: {},
  },
  reducers: {
    addNewList: (state, { payload }) => {
      state.value[payload] = [createTask("default")];
    },
    removeList: (state, { payload }) => {
      return {
        ...state,
        value: removeProp(payload, state.value),
      };
    },
    addNewTask: (state, { payload }) => {
      const taskName = payload.taskName;
      const listName = payload.listName;
      return {
        ...state,
        value: addTask(listName, current(state).value, taskName),
      };
    },
  },
});

export const { addNewList, removeList, addNewTask } = listsSlice.actions;

export default listsSlice.reducer;
