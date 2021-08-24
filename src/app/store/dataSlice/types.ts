import { INote } from "../../../pages/Notes/Note";

export interface IAuthState {
  isLoading: boolean;
  error: string | null;
  notes: Required<INote>[];
}
