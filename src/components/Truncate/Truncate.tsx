import React from "react";
import { ITruncateProps } from "./types";

export const Truncate: React.FC<ITruncateProps> = ({
  text,
  maxCharts = 80,
}) => {
  return (
    <span>
      {text.length <= maxCharts ? text : `${text.slice(0, maxCharts)}...`}
    </span>
  );
};
