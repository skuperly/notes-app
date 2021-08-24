import React from "react";
import { INoteViewProps } from "./types";
import "./noteView.scss";

export const NoteView: React.FC<INoteViewProps> = ({ note }) => {
  return (
    <>
      <h2 className="NoteView-title">{note.title}</h2>
      <span className="NoteView-body">{note.body}</span>
    </>
  );
};
