import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import NoteCard from "../NoteCard/Notecard";
import { handleDeleteNote, handleUpdateNote } from "../../utils/utils";
import "../../styles/AllNotes.css";
const DeletedNotes = () => {
  const deletednotes = useSelector((state: RootState) => state.notes.deletedNotes);
  const dispatch = useDispatch();
  return (
    <>
      {deletednotes.length > 0 ? (
        <div className="notes-container">
          <div className="archived-notes">
            <div className="archived-notes-heading">
              Deleted Notes
            </div>
            <div className="notes-grid">
              {deletednotes.map((note) => (
                <NoteCard
                  key={note.uid}
                  note={note}
                  onDelete={(uid) => handleDeleteNote(dispatch, uid)}
                  onUpdate={(uid, fieldsToUpdate) =>
                    handleUpdateNote(dispatch, uid, fieldsToUpdate)
                  }
                  deletedNotes={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeletedNotes;
