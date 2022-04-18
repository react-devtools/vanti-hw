const REQUEST_TIME = 2000;

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  if (action.type !== "lists/startLoader") {
    setTimeout(() => {
      let result = next(action);
      console.log("next state", store.getState());
      console.groupEnd();
      return result;
    }, REQUEST_TIME);
  } else {
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  }
};

export default logger;
