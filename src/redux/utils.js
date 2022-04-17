export const createTask = (taskName) => {
  return {
    name: taskName,
    description: "Description",
  };
};
export const removeProp = (key, obj) => {
  let copy = Object.assign({}, obj);
  delete copy[key];
  return copy;
};
export const addTask = (key, obj, task) => {
  let copy = Object.assign({}, obj);
  let List = copy[key];
  List = [...List, createTask(task)];
  copy[key] = List;
  return copy;
};
export const renameListObj = (obj, oldName, newName) => {
  let copy = Object.assign({}, obj);
  delete Object.assign(copy, { [newName]: copy[oldName] })[oldName];
  return copy;
};
