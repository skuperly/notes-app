import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  addNoteAsync,
  selectDataError,
  selectDataIsLoading,
  updateNoteAsync,
} from "../../../../app/store/dataSlice";
import { AutoTextArea } from "../../../../components/AutoTextArea";
import { Button } from "../../../../components/Button";
import { ErrorMsg } from "../../../../components/ErrorMsg";
import { INote } from "../types";
import "./noteEdit.scss";
import { INoteEditProps } from "./types";

const NoteSchema = Yup.object().shape({
  title: Yup.string().max(80).required("Required"),
  body: Yup.string().required("Required"),
});

export const NoteEdit: React.FC<INoteEditProps> = ({ note }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectDataIsLoading);
  const dataError = useAppSelector(selectDataError);

  const initialValues: INote = {
    title: note?.title ?? "",
    body: note?.body ?? "",
  };

  const handleSubmit = (values: INote, actions: FormikHelpers<INote>) => {
    if (note) {
      dispatch(updateNoteAsync(note.id, values.title, values.body));
      actions.resetForm({ values: { ...values } });
      return;
    }

    dispatch(addNoteAsync(values.title, values.body));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}>
      {({ isValid, dirty, isSubmitting, errors }) => (
        <Form>
          <Field id="title" name="title" placeholder="Add Title" />
          <ErrorMsg msg={errors.title} />
          <Field
            id="body"
            name="body"
            placeholder="Add Body"
            as={AutoTextArea}
          />
          <ErrorMsg msg={errors.body} />
          <Button
            className="NoteEdit-submitBtn"
            type="submit"
            disabled={!isValid || !dirty || isSubmitting || isLoading}>
            {note ? "Update" : "Add note"}
          </Button>
          <ErrorMsg msg={dataError} />
        </Form>
      )}
    </Formik>
  );
};
