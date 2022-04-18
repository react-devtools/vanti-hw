export const createTask = (taskName, taskDescription) => {
  return {
    name: taskName,
    description: taskDescription,
  };
};
export const removeProp = (key, state) => {
  let copy = Object.assign({}, state);
  delete copy[key];
  return copy;
};
export const addTask = (key, state, task, taskDescription) => {
  let copy = Object.assign({}, state);
  let List = copy[key];
  console.log("taskDescription", taskDescription);
  List = [...List, createTask(task, taskDescription)];
  copy[key] = List;
  return copy;
};
export const renameListObj = (state, oldName, newName) => {
  let copy = Object.assign({}, state);
  delete Object.assign(copy, { [newName]: copy[oldName] })[oldName];
  return copy;
};

export const moveTask = (state, oldList, newList, taskIndex) => {
  let copy = Object.assign({}, state);
  const oldArray = [...copy[oldList]];
  const newArray = [...copy[newList]];
  const task = oldArray[taskIndex];
  oldArray.splice(taskIndex, 1);
  newArray.push(task);
  copy = {
    ...copy,
    [oldList]: oldArray,
    [newList]: newArray,
  };
  return copy;
};
