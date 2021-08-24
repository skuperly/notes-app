import React from "react";
import classNames from "classnames";
import "./container.scss";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames("Container", className)} {...props}>
      {children}
    </div>
  );
};
