import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState<string>("")
    const [error, setError] = useState<string>("")

    const onchangeInput = (event: ChangeEvent<HTMLInputElement>) => setItemTitle(event.currentTarget.value)

    const onkeypressInput = (event: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (event.key === 'Enter') addItem()
    }

    const addItem = () => {
        if (itemTitle.trim() !== "") {
            props.addItem(itemTitle)
            setItemTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                className={error ? "error" : ""}
                onChange={onchangeInput}
                onKeyDown={onkeypressInput}
                value={itemTitle}
            />
            <Button buttonName="+" onClick={addItem}/>
            <div className="error-message">{error}</div>
        </div>
    )
}