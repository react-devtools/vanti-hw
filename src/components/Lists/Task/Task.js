import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { Delete, Build, Save } from "@material-ui/icons";
import { Grid, Input, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { removeTask, renameTaskDescription, renameTaskName, moveTaskTo } from "../../../redux/reducer";
import { styles } from "../../resources/styles";

export const Task = ({ task, taskIndex, list, displayMoveBox }) => {
  const dispatch = useDispatch();
  const lists = Object.keys(useSelector((state) => state.value));
  const options = lists.map((list) => {
    return { value: list, label: list };
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedOption) {
      dispatch(moveTaskTo({ oldList: list, newList: selectedOption.value, taskIndex }));
    }
  }, [selectedOption]);

  const deleteTask = (listName, taskIndex) => {
    return () => {
      dispatch(removeTask({ listName, taskIndex }));
      setFade(true);
    };
  };

  const gridClass = fade ? "fade-out" : "";

  const onEdit = (event) => {
    event.preventDefault();
    if (name) {
      dispatch(renameTaskName({ listName: list, taskIndex, newName: name }));
    }
    if (description) {
      dispatch(renameTaskDescription({ listName: list, taskIndex, newDescription: description }));
    }
    setEditMode(false);
  };

  return (
    <Grid xs={12} item={true} itemkey={taskIndex} className={`${gridClass}`}>
      <Paper elevation={2} style={styles.Paper}>
        {editMode ? (
          <form onSubmit={onEdit} style={{ display: "flex" }}>
            <Input style={{ width: "90%" }} defaultValue={task.name} onChange={(e) => setName(e.target.value)} />
            <Input style={{ width: "90%" }} defaultValue={task.description} onChange={(e) => setDescription(e.target.value)} />
            <IconButton type="submit" color="primary" aria-label="Add" style={styles.Icon}>
              <Save fontSize="small" />
            </IconButton>
          </form>
        ) : (
          <span>
            {task.name}-{task.description}
          </span>
        )}
        <IconButton color="primary" aria-label="Edit" style={styles.Icon} onClick={(e) => setEditMode(!editMode)}>
          <Build fontSize="small" />
        </IconButton>
        <IconButton color="secondary" aria-label="Delete" onClick={deleteTask(list, taskIndex)}>
          <Delete fontSize="small" />
        </IconButton>
        {displayMoveBox && <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />}
      </Paper>
    </Grid>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  taskIndex: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired,
  displayMoveBox: PropTypes.bool.isRequired,
};
