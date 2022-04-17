import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "../../redux/reducer"

export function Lists() {
  const lists = useSelector((state) => state.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button aria-label="Add value" onClick={() => dispatch(increment())}>
          Add Value
        </button>
        <span>{lists.join(",")}</span>
        <button aria-label="Remove value" onClick={() => dispatch(decrement())}>
          Remove Value
        </button>
      </div>
    </div>
  )
}
