import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { addNewTask } from "../../redux/reducer";
import { useForm, useFieldArray } from "react-hook-form";

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

  return Object.keys(lists).map((list, listIndex) => (
    <ListCard key={listIndex}>
      <ListTitle>{list}</ListTitle>
      {lists[list].map((task, taskIndex) => (
        <TaskTitle key={taskIndex}>{task.name}</TaskTitle>
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
