import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { addNewTask, renameList, renameTaskDescription, renameTaskName } from "../../redux/reducer";
import { useForm, useFieldArray } from "react-hook-form";
import Editable from "./Editable";

const ListCard = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const ListTitle = styled.h1`
  font-size: 2em;
`;
const TaskTitle = styled.h2`
  font-size: 1.5em;
`;

export function SingleList() {
  const lists = useSelector((state) => state.value);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      task: [{ taskName: "" }],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "task",
  });

  const onTaskSubmit = ({ task, listName }) => {
    const taskName = task.task[0].taskName;
    dispatch(addNewTask({ listName, taskName }));
    reset();
  };
  const updateListName = ({ oldName, newName }) => {
    dispatch(renameList({ oldName, newName }));
  };
  const updateTaskName = ({ listName, taskIndex, newName }) => {
    dispatch(renameTaskName({ listName, taskIndex, newName }));
  };
  const updateTaskDescription = ({ listName, taskIndex, newDescription }) => {
    dispatch(renameTaskDescription({ listName, taskIndex, newDescription }));
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
      </ListTitle>
      {lists[list].map((task, taskIndex) => (
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
          <Editable text={task.description} type="input">
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
        </TaskTitle>
      ))}
      <form key={listIndex} onSubmit={handleSubmit((data) => onTaskSubmit({ task: data, listName: list }))}>
        {fields.map((curField, fieldsIndex) => {
          return (
            <li key={curField.id}>
              <input key={`task.${fieldsIndex}.taskName`} name={`task.${fieldsIndex}.taskName`} {...register(`task.${fieldsIndex}.taskName`)} required />
            </li>
          );
        })}
        <input type="submit" />
      </form>
    </ListCard>
  ));
}
