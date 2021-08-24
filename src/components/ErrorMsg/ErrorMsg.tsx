import React from "react";
import classNames from "classnames";
import { IErrorMsgProps } from "./types";
import "./errorMsg.scss";

export const ErrorMsg: React.FC<IErrorMsgProps> = ({
  className,
  msg,
  ...props
}) => {
  return (
    <span className={classNames("ErrorMsg", className)} {...props}>
      {msg}
    </span>
  );
};
