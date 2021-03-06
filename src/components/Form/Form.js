import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { addNewList, startLoader, listsSlice } from "../../redux/reducer";

const schema = yup
  .object({
    listName: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9_.-]*$/, "List name should contain letters and numbers only"),
  })
  .required();

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const lists = useSelector((state) => state.value);
  const [existError, setExistError] = useState("");

  const onSubmit = ({ listName }) => {
    const nameExist = Object.keys(lists).indexOf(listName) >= 0;
    if (!nameExist) {
      dispatch(startLoader());
      dispatch(addNewList(listName));

      setExistError("");
      reset();
    } else {
      setExistError("The list already exists, please pick another name");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="ListName">
        List name:
        <Input {...register("listName")} id="listName" />
        <p>{errors.listName?.message || existError}</p>
      </label>
      <Button type="submit">Add</Button>
    </form>
  );
}
