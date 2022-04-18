import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import Editable from "../common/Editable";
import { removeTask, renameTaskDescription, renameTaskName, moveTaskTo } from "../../../redux/reducer";

const TaskTitle = styled.h2`
  font-size: 1.5em;
`;
export const Task = ({ task, taskIndex, list, displayMoveBox }) => {
  const dispatch = useDispatch();
  const lists = Object.keys(useSelector((state) => state.value));
  const options = lists.map((list) => {
    return { value: list, label: list };
  });
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption) {
      dispatch(moveTaskTo({ oldList: list, newList: selectedOption.value, taskIndex }));
    }
  }, [selectedOption]);

  const updateTaskName = ({ listName, taskIndex, newName }) => {
    dispatch(renameTaskName({ listName, taskIndex, newName }));
  };
  const updateTaskDescription = ({ listName, taskIndex, newDescription }) => {
    dispatch(renameTaskDescription({ listName, taskIndex, newDescription }));
  };
  const deleteTask = (listName, taskIndex) => {
    return () => {
      dispatch(removeTask({ listName, taskIndex }));
    };
  };

  return (
    <TaskTitle key={taskIndex}>
      <Editable text={task.name} type="input">
        <input
          type="text"
          value={task.name}
          onChange={(e) =>
            updateTaskName({
              listName: list,
              taskIndex: taskIndex,
              newName: e.target.value,
            })
          }
        />
      </Editable>
      <Editable text={task.description} type="input" placeholder="Add your description here">
        <input
          type="text"
          value={task.description}
          onChange={(e) =>
            updateTaskDescription({
              listName: list,
              taskIndex: taskIndex,
              newDescription: e.target.value,
            })
          }
        />
      </Editable>
      <button onClick={deleteTask(list, taskIndex)}>Delete</button>
      {displayMoveBox && <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />}
    </TaskTitle>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  taskIndex: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired,
  displayMoveBox: PropTypes.bool.isRequired,
};
