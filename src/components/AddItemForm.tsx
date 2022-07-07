import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

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
            <TextField
                id="outlined-error-helper-text"
                size="small"
                variant="outlined"
                error={!!error}
                label="Type value"
                helperText={error}
                onChange={onchangeInput}
                onKeyDown={onkeypressInput}
                value={itemTitle}
            />
            <IconButton
                aria-label="add item"
                onClick={addItem}
                color="secondary"
                size="large"
            >
                <AddBoxRoundedIcon />
            </IconButton>
        </div>
    )
}