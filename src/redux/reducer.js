import { createSlice, current } from "@reduxjs/toolkit";
import { addTask, createTask, removeProp, renameListObj } from "./utils";

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
    renameList: (state, { payload }) => {
      const oldName = payload.oldName;
      const newName = payload.newName;
      return {
        ...state,
        value: renameListObj(current(state).value, oldName, newName),
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

export const { addNewList, renameList, addNewTask } = listsSlice.actions;

export default listsSlice.reducer;
