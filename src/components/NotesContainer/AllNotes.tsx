import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import NoteCard from "../NoteCard/Notecard";
import "../../styles/AllNotes.css";
import { GoLightBulb } from "react-icons/go";
import PinnedNotes from "../PinnedNotes/PinnedNotes";
import { handleDeleteNote, handleUpdateNote } from "../../utils/utils";
const AllNotes = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const hasPinnedNotes = notes.some(note => note.isPinned);
  const hasNotes = notes.some(note=>!note.isArchived&&!note.isPinned);
  const hasNonPinnedNotes = notes.some(note => !note.isPinned);
  const dispatch = useDispatch();  return (
    <div className="notes-container">
      <PinnedNotes/>
      {hasPinnedNotes&&hasNonPinnedNotes?<div className="others-heading">Others</div>:null}
      {hasPinnedNotes||hasNotes? (
        <div className="notes-grid">
          {notes.map((note) => (
            !note.isPinned&&!note.isArchived?
            <NoteCard
              key={note.uid}
              note={note}
              onDelete={(uid) => handleDeleteNote(dispatch, uid)}
              onUpdate={(uid, fieldsToUpdate) =>
                handleUpdateNote(dispatch, uid, fieldsToUpdate)
              }
              deletedNotes={false}
            />:null
          ))}
        </div>
      ) : (
        <div className="notes-container-empty">
          <div>
            <GoLightBulb className="notes-empty-icon"/>
          </div>
          <h2>Notes you add appear here</h2>
        </div>
      )}
    </div>
  );
};

export default AllNotes;
