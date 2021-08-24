import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CONSTANTS } from "../../app/constants";
import { useAppSelector } from "../../app/hooks";
import { selectNote } from "../../app/store/dataSlice";
import { RouterParams } from "../../types";
import { Note } from "../Notes/Note";

export const NoteDetails = () => {
  const { noteId } = useParams<RouterParams>();
  const note = useAppSelector(selectNote(parseInt(noteId)));
  const history = useHistory();

  if (!note) {
    history.replace(CONSTANTS.ROUTES.NOTES_PAGE);
    return null;
  }

  return <Note note={note} />;
};
