import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNotesAsync, selectNotes } from "../../app/store/dataSlice";
import { Card } from "../../components/Card";
import { NoteEdit } from "./Note/NoteEdit";
import { NotePreview } from "./NotePreview";

export const Notes = () => {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  return (
    <>
      <Card>
        <NoteEdit />
      </Card>
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </>
  );
};
