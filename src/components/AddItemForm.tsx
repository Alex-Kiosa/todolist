import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, Stack, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: Props) => {
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
        <Stack direction={"row"} sx={{alignItems: 'start'}}>
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
                // size="large"
                color="primary"
            >
                <AddBoxIcon/>
            </IconButton>
        </Stack>
    )
}