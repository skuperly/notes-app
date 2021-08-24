import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, selectUser } from "../../app/store/authSlice";
import { Button } from "../Button";
import "./header.scss";

export const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div className="Header">
      <h1 className="Header-title">{`${user?.username} Notes`}</h1>
      <Button
        fab
        className="Header-btn"
        onClick={() => dispatch(logoutAsync())}>
        <i className="fas fa-sign-out-alt"></i>
      </Button>
    </div>
  );
};
