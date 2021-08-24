import classNames from "classnames";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CONSTANTS } from "../../../app/constants";
import { useAppDispatch } from "../../../app/hooks";
import { deleteNoteAsync } from "../../../app/store/dataSlice";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import "./note.scss";
import { NoteEdit } from "./NoteEdit";
import { NoteView } from "./NoteView";
import { INoteProps } from "./types";

export const Note: React.FC<INoteProps> = ({ note }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  const history = useHistory();

  return (
    <Card>
      <div className="Note-topBtns">
        <Button
          fab
          onClick={(e) => {
            history.push(CONSTANTS.ROUTES.NOTES_PAGE);
          }}>
          <i className="fas fa-arrow-left"></i>
        </Button>
        <div className="Note-rightBtns">
          <Button
            className="Note-editBtn"
            fab
            onClick={(e) => {
              setEditMode((value) => !value);
            }}>
            <i
              className={classNames("fas", {
                "fa-pen": !editMode,
                "fa-file-alt": editMode,
              })}
            />
          </Button>
          <Button
            className="Note-deleteBtn"
            fab
            onClick={(e) => {
              dispatch(deleteNoteAsync(note.id));
            }}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      </div>
      {editMode ? <NoteEdit note={note} /> : <NoteView note={note} />}
    </Card>
  );
};
