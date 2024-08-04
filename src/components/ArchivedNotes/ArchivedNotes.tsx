import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Note } from "../../interfaces/types";
import NoteCard from "../NoteCard/Notecard";
import { useEffect, useState } from "react";
import { handleDeleteNote, handleUpdateNote } from "../../utils/utils";
import { IoArchiveOutline } from "react-icons/io5";
import "../../styles/AllNotes.css";
const ArchivedNotes = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const [data, setData] = useState<Note[]>([]);
  useEffect(() => {
    const archiveddata = notes.filter((note) => note.isArchived == true);
    setData(archiveddata);
  }, [notes]);
  return (
    <>
      {data.length > 0 ? (
        <div className="notes-container">
          <div className="archived-notes">
            <div className="archived-notes-heading">
              Archived Notes <IoArchiveOutline style={{marginLeft:'10px'}}/>
            </div>
            <div className="notes-grid">
              {data.map((note) => (
                <NoteCard
                  key={note.uid}
                  note={note}
                  onDelete={(uid) => handleDeleteNote(dispatch, uid)}
                  onUpdate={(uid, fieldsToUpdate) =>
                    handleUpdateNote(dispatch, uid, fieldsToUpdate)
                  }
                  deletedNotes={false}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ArchivedNotes;
