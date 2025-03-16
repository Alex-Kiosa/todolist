import React from "react";

type DefaultButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type Props = DefaultButtonProps & {
    buttonName: string
}

export const Button: React.FC<Props> = ({buttonName,...restProps}) => {
    return (
        <button {...restProps}>{buttonName}</button>
    )
}
