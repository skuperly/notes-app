import classNames from "classnames";
import React from "react";
import "./button.scss";
import { IButtonProps } from "./types";

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  fab = false,
  ...props
}) => {
  return (
    <button
      className={classNames("Button", { "Button-fab": fab }, className)}
      {...props}>
      {children}
    </button>
  );
};
