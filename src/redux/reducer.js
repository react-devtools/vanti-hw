import { createSlice } from "@reduxjs/toolkit"

export const listsSlice = createSlice({
  name: "lists",
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state) => {
      state.value = [...state.value, "abc"]
    },
    decrement: (state) => {
      state.value = state.value.slice(0, -1) || []
    },
  },
})

export const { increment, decrement } = listsSlice.actions

export default listsSlice.reducer
