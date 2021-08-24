import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAutIsLoading } from "../../app/store/authSlice";
import { selectDataIsLoading } from "../../app/store/dataSlice";
import { LoadingBar } from "../LoadingBar";

export const AppLoadingBar = () => {
  const authIsLoading = useAppSelector(selectAutIsLoading);
  const dataIsLoading = useAppSelector(selectDataIsLoading);
  return <LoadingBar loading={authIsLoading || dataIsLoading} />;
};
