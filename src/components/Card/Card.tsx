import React from "react";
import classNames from "classnames";
import "./card.scss";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames("Card", className, {
        "Card-pointer": props.onClick,
      })}
      {...props}>
      {children}
    </div>
  );
};
