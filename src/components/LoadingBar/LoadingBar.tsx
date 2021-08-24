import React from "react";
import "./loadingBar.scss";
import { ILoadingBar } from "./types";

export const LoadingBar: React.FC<ILoadingBar> = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div className="progress-materializecss">
          <div className="indeterminate" />
        </div>
      ) : null}
    </>
  );
};
