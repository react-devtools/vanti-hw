export const createTask = (taskName) => {
  return {
    name: taskName,
    description: "Description",
  };
};
export const removeProp = (key, state) => {
  let copy = Object.assign({}, state);
  delete copy[key];
  return copy;
};
export const addTask = (key, state, task) => {
  let copy = Object.assign({}, state);
  let List = copy[key];
  List = [...List, createTask(task)];
  copy[key] = List;
  return copy;
};
export const deleteTask = (listName, state, taskIndex) => {
  let copy = Object.assign({}, state);

  return copy;
};
export const renameListObj = (state, oldName, newName) => {
  let copy = Object.assign({}, state);
  delete Object.assign(copy, { [newName]: copy[oldName] })[oldName];
  return copy;
};
