import React from "react";
import { useHistory } from "react-router-dom";
import { CONSTANTS } from "../../../app/constants";
import { Card } from "../../../components/Card";
import { INotePreviewProps } from "./types";
import "./notePreview.scss";
import { Truncate } from "../../../components/Truncate";

export const NotePreview: React.FC<INotePreviewProps> = ({ note }) => {
  const history = useHistory();

  return (
    <Card
      className="NotePreview-root"
      onClick={(e) => {
        e.stopPropagation();
        history.push(`${CONSTANTS.ROUTES.NOTES_PAGE}/${note.id}/`);
      }}>
      <h2 className="NotePreview-title">{note.title}</h2>
      <Truncate text={note.body} />
    </Card>
  );
};
