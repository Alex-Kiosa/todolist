import React from "react";

type PropsType = {
    name: string
    callback: () => void
}

export const Button = (props: PropsType) => {
    const onclickHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onclickHandler}>{props.name}</button>
    )
}