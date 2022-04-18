import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { addNewTask, removeList, renameList, renameTaskDescription, renameTaskName, removeTask } from "../../redux/reducer";
import { useForm, useFieldArray } from "react-hook-form";
import Editable from "./common/Editable";
import { Task } from "./Task/Task";
import { listsSelector } from "../../redux/selectors";

const ListCard = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const ListTitle = styled.h1`
  font-size: 2em;
`;

export function SingleList() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.value);
  const shouldDisplayMoveButton = useSelector(listsSelector);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      task: [{ taskName: "", description: "" }],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "task",
  });

  const onTaskSubmit = ({ task, listName }) => {
    const taskName = task.task[0].taskName;
    const taskDescription = task.task[0].taskDescription;
    dispatch(addNewTask({ listName, taskName, taskDescription }));
    reset();
  };
  const updateListName = ({ oldName, newName }) => {
    dispatch(renameList({ oldName, newName }));
  };

  const deleteList = (listName) => {
    return () => {
      dispatch(removeList(listName));
    };
  };

  return Object.keys(lists).map((list, listIndex) => (
    <ListCard key={listIndex}>
      <ListTitle>
        <Editable text={list} type="input">
          <input
            type="text"
            value={list}
            onChange={(e) =>
              updateListName({
                oldName: list,
                newName: e.target.value,
              })
            }
          />
        </Editable>
        <button onClick={deleteList(list)}>Delete</button>
      </ListTitle>
      {lists[list].map((task, taskIndex) => (
        <Task taskIndex={taskIndex} task={task} list={list} key={`task${taskIndex}`} displayMoveBox={shouldDisplayMoveButton} />
      ))}
      <form key={listIndex} onSubmit={handleSubmit((data) => onTaskSubmit({ task: data, listName: list }))}>
        {fields.map((curField, fieldsIndex) => {
          return (
            <li key={curField.id}>
              <input
                key={`task.${fieldsIndex}.taskName`}
                name={`task.${fieldsIndex}.taskName`}
                {...register(`task.${fieldsIndex}.taskName`)}
                placeholder="Enter task name"
                required
              />
              <input
                key={`task.${fieldsIndex}.taskDescription`}
                name={`task.${fieldsIndex}.taskDescription`}
                {...register(`task.${fieldsIndex}.taskDescription`)}
                placeholder="Enter task description"
              />
            </li>
          );
        })}
        <input type="submit" />
      </form>
    </ListCard>
  ));
}
