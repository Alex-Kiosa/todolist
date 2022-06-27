import React from "react";

type DefaultButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type CustomButtonProps = DefaultButtonProps & {
    buttonName: string
}

export const Button: React.FC<CustomButtonProps> = ({buttonName,...restProps}) => {
    return (
        <button {...restProps}>{buttonName}</button>
    )
}
