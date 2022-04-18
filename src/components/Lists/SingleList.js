import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Grid, Paper } from "@material-ui/core";

import { addNewTask, startLoader, loadDone, removeList, renameList } from "../../redux/reducer";
import { useForm, useFieldArray } from "react-hook-form";
import { Task } from "./Task/Task";
import { listsSelector } from "../../redux/selectors";
import IconButton from "@material-ui/core/IconButton";
import { Build, Delete, Save } from "@material-ui/icons";
import { styles } from "../resources/styles";

export function SingleList() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.value);
  const shouldDisplayMoveButton = useSelector(listsSelector);
  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState({});

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
    dispatch(startLoader());
    dispatch(addNewTask({ listName, taskName, taskDescription }));
    setEditMode({
      ...editMode,
      [listName]: false,
    });
    reset();
  };

  const openTitleEdit = (list) => {
    setEditMode({
      ...editMode,
      [list]: true,
    });
    console.log("editMode", editMode);
  };

  const deleteList = (listName) => {
    return () => {
      dispatch(startLoader());
      dispatch(removeList(listName));
    };
  };

  const onEdit = ({ oldName, newName }) => {
    dispatch(startLoader());
    dispatch(renameList({ oldName, newName }));
  };

  return Object.keys(lists).map((list, listIndex) => (
    <Grid xs={12} item={true} itemkey={listIndex} key={list}>
      <Paper elevation={2} style={styles.Paper}>
        <div style={{ backgroundColor: "#99ff99" }}>
          {editMode[list] ? (
            <form onSubmit={(e) => onEdit({ oldName: list, newName: name })} style={{ display: "flex", width: "90%" }}>
              <Input style={{ width: "90%" }} defaultValue={list} onChange={(e) => setName(e.target.value)} />
              <IconButton type="submit" color="primary" aria-label="Add" style={styles.Icon}>
                <Save fontSize="small" />
              </IconButton>
            </form>
          ) : (
            <div>
              <span>{list}</span>
              <IconButton color="primary" aria-label="Edit" style={styles.Icon} onClick={(e) => openTitleEdit(list)}>
                <Build fontSize="small" />
              </IconButton>
              <IconButton color="secondary" aria-label="Delete" onClick={deleteList(list)}>
                <Delete fontSize="small" />
              </IconButton>
            </div>
          )}
        </div>
      </Paper>
      {lists[list].map((task, taskIndex) => (
        <Task taskIndex={taskIndex} task={task} list={list} key={`task${taskIndex}`} displayMoveBox={shouldDisplayMoveButton} />
      ))}
      <form key={listIndex} onSubmit={handleSubmit((data) => onTaskSubmit({ task: data, listName: list }))} style={{ margin: "10px" }}>
        {fields.map((curField, fieldsIndex) => {
          return (
            <li key={curField.id}>
              <Input
                key={`task.${fieldsIndex}.taskName`}
                name={`task.${fieldsIndex}.taskName`}
                {...register(`task.${fieldsIndex}.taskName`)}
                placeholder="Enter task name"
                required
              />
              <Input
                key={`task.${fieldsIndex}.taskDescription`}
                name={`task.${fieldsIndex}.taskDescription`}
                {...register(`task.${fieldsIndex}.taskDescription`)}
                placeholder="Enter task description"
              />
            </li>
          );
        })}
        <Button type="submit" variant="contained" color="primary" style={{ width: "10%", margin: "10px" }}>
          Add
        </Button>
      </form>
    </Grid>
  ));
}
