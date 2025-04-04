import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Input } from "@mui/material"

type Props = {
  value: string
  onChange: (editedText: string) => void
}

export const EditableSpan = (props: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.value)
  const [error, setError] = useState<string>("")

  const activateEditMode = () => {
    setEditMode(true)
  }

  const activateViewMode = () => {
    if (title.trim() === "") {
      setError("Field is required")
    } else {
      setEditMode(false)
      props.onChange(title)
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setError("")
    setTitle(event.currentTarget.value)
    if (event.key === "Enter") activateViewMode()
  }

  return editMode ? (
    <div>
      <Input
        className={error ? "error" : ""}
        onChange={onChange}
        onKeyDown={onKeyPress}
        value={title}
        onBlur={activateViewMode}
        autoFocus
      />
      <div className="error-message">{error}</div>
    </div>
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  )
}
