import { createSlice, current } from "@reduxjs/toolkit";
import { addTask, moveTask, removeProp, renameListObj } from "./utils";

export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    value: {},
    isLoading: false,
  },
  reducers: {
    addNewList: (state, { payload }) => {
      return {
        ...state,
        value: { ...state.value, [payload]: [] },
        isLoading: false,
      };
    },
    removeList: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        value: removeProp(payload, state.value),
      };
    },
    renameList: (state, { payload }) => {
      const oldName = payload.oldName;
      const newName = payload.newName;
      return {
        ...state,
        isLoading: false,
        value: renameListObj(current(state).value, oldName, newName),
      };
    },
    renameTaskName: (state, { payload }) => {
      const listName = payload.listName;
      const taskIndex = payload.taskIndex;
      const newName = payload.newName;
      return {
        ...state,
        isLoading: false,
        value: {
          ...state.value,
          [listName]: state.value[listName].map((task, index) =>
            taskIndex === index
              ? {
                  ...task,
                  name: newName,
                }
              : task
          ),
        },
      };
    },
    renameTaskDescription: (state, { payload }) => {
      const listName = payload.listName;
      const taskIndex = payload.taskIndex;
      const newDescription = payload.newDescription;
      return {
        ...state,
        isLoading: false,
        value: {
          ...state.value,
          [listName]: state.value[listName].map((task, index) =>
            taskIndex === index
              ? {
                  ...task,
                  description: newDescription,
                }
              : task
          ),
        },
      };
    },
    addNewTask: (state, { payload }) => {
      const taskName = payload.taskName;
      const listName = payload.listName;
      const taskDescription = payload.taskDescription;
      return {
        ...state,
        isLoading: false,
        value: addTask(listName, current(state).value, taskName, taskDescription),
      };
    },
    removeTask: (state, { payload }) => {
      const taskIndex = payload.taskIndex;
      const listName = payload.listName;
      return {
        ...state,
        isLoading: false,
        value: {
          ...state.value,
          [listName]: state.value[listName].filter((task, index) => taskIndex !== index),
        },
      };
    },
    moveTaskTo: (state, { payload }) => {
      const taskIndex = payload.taskIndex;
      const oldList = payload.oldList;
      const newList = payload.newList;
      return {
        ...state,
        isLoading: false,
        value: moveTask(current(state).value, oldList, newList, taskIndex),
      };
    },
    startLoader: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
  },
});

export const { addNewList, renameList, addNewTask, renameTaskName, renameTaskDescription, removeList, removeTask, moveTaskTo, startLoader } =
  listsSlice.actions;

export default listsSlice.reducer;
