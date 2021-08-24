import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "..";
import { INote } from "../../../pages/Notes/Note";
import {
  fetchAddNote,
  fetchDeleteNote,
  fetchNotes,
  fetchUpdteNote,
  getHttpErrorMsg,
} from "../../service";
import { clearState } from "../authSlice";
import { IAuthState } from "./types";

const initialState: IAuthState = {
  isLoading: false,
  error: null,
  notes: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.error = null;
      state.isLoading = action.payload;
    },
    setNotes: (state, action: PayloadAction<Required<INote>[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Required<INote>>) => {
      state.notes = [action.payload, ...state.notes];
    },
    updateNote: (state, action: PayloadAction<Required<INote>>) => {
      const newNotes = state.notes.filter(
        (note) => note.id !== action.payload.id
      );
      state.notes = [action.payload, ...newNotes];
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      const newNotes = state.notes.filter((note) => note.id !== action.payload);
      state.notes = newNotes;
    },
  },
  extraReducers: {
    [clearState.type]: (state) => {
      state.error = null;
      state.notes = [];
    },
  },
});

const { setError, setLoading, setNotes, addNote, updateNote, deleteNote } =
  dataSlice.actions;

export const selectDataIsLoading = (state: RootState) => state.data.isLoading;

export const selectDataError = (state: RootState) => state.data.error;

export const selectNotes = (state: RootState) => state.data.notes;

export const selectNote = (noteId: number) => (state: RootState) => {
  const note = state.data.notes.filter((note) => note.id === noteId);
  return note[0];
};

export const getNotesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data: notes } = await fetchNotes();
    dispatch(setNotes(notes));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNoteAsync =
  (title: string, body: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { data: note } = await fetchAddNote(title, body);
      dispatch(addNote(note));
    } catch (error) {
      dispatch(setError(getHttpErrorMsg(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateNoteAsync =
  (noteId: number, title: string, body: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { data: note } = await fetchUpdteNote(noteId, title, body);
      dispatch(updateNote(note));
    } catch (error) {
      dispatch(setError(getHttpErrorMsg(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteNoteAsync =
  (noteId: number): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      await fetchDeleteNote(noteId);
      dispatch(deleteNote(noteId));
    } catch (error) {
      dispatch(setError(getHttpErrorMsg(error)));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const dataReducer = dataSlice.reducer;
