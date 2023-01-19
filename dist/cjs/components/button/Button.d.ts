import React from "react";
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "success";
}
export declare const Button: React.FC<ButtonProps>;
