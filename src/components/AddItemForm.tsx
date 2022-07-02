import {Button} from "./Button";
import React, {useState, ChangeEvent, KeyboardEvent} from "react";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState<string>("")

    const onchangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setItemTitle(event.currentTarget.value)

    const onkeypressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === 'Enter') addItemHandler()
    }

    const addItemHandler = () => {
        if (itemTitle.trim() !== "") {
            props.addItem(itemTitle)
            setItemTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input className={error ? "error" : ""} onChange={onchangeInputHandler}
                   onKeyDown={onkeypressInputHandler} value={itemTitle}/>
            <Button buttonName="+" onClick={addItemHandler}/>
            <div className="error-message">{error}</div>
        </div>
    )
}