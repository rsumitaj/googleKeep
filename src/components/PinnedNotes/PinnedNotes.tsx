import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Note } from "../../interfaces/types";
import NoteCard from "../NoteCard/Notecard";
import "../../styles/AllNotes.css";
import { useEffect, useState } from "react";
import { MdPushPin } from "react-icons/md";
import { handleDeleteNote, handleUpdateNote } from "../../utils/utils";
const PinnedNotes = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const [data,setData] = useState<Note[]>([]);
  useEffect(()=>{
     const pinneddata = notes.filter((note)=>(
        note.isPinned==true
     ));
     setData(pinneddata)
  },[notes])
  return (
      <>
      {data.length > 0 ?
        <div className="pinned-notes">
        <div className="pinned-notes-heading">Pinned Notes  <MdPushPin/></div>
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
          :
          null}
    </>
  );
};

export default PinnedNotes;
