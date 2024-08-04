// utils/noteUtils.ts

import { Dispatch } from "redux";
import { deleteNote, updateNote } from "../redux/notesSlice";
import { Note } from "../interfaces/types";

export const handleDeleteNote = (dispatch: Dispatch, uid: string) => {
  dispatch(deleteNote(uid));
};

export const handleUpdateNote = (
  dispatch: Dispatch,
  uid: string,
  fieldsToUpdate: Partial<Note>
) => {
  dispatch(
    updateNote({
      uid,
      ...fieldsToUpdate,
    })
  );
};
