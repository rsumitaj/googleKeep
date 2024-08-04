import React, { useState } from 'react';
import { NoteCardProps } from '../../interfaces/types';
import '../../styles/NotesCard.css'
import { IoArchiveOutline,IoArchiveSharp, IoColorPaletteOutline  } from "react-icons/io5";
import { MdOutlinePushPin,MdPushPin } from "react-icons/md";
import { BiTrash } from 'react-icons/bi';
import ColorPickerModal from '../ColorPickerModal/ColorPickerModal';
const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onUpdate,deletedNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onUpdate(note.uid, { color });
  };
  console.log(selectedColor)
  return (
    <div className="note-card" style={{backgroundColor:note.color}}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      {note.imageUrl && <img src={note.imageUrl} alt="Selected" className="note-image-preview" />}
      {!deletedNotes&&<div className='note-card-options'>
      <div onClick={() => onDelete(note.uid)} style={{color:'red'}}  className='note-icon'><BiTrash/></div>
      <div
        onClick={() =>
          onUpdate(note.uid, { isPinned: !note.isPinned })
        }
         className='note-icon'
      >
        {note.isPinned ? <MdPushPin/>:<MdOutlinePushPin/>}
      </div>
      <div
        onClick={() =>
          onUpdate(note.uid, { isArchived: !note.isArchived })
        }
         className='note-icon'
      >
        {note.isArchived ? <IoArchiveSharp/> : <IoArchiveOutline/>}
      </div>
      <div onClick={() => setIsModalOpen(true)} className='note-icon'><IoColorPaletteOutline /></div>
      <ColorPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleColorChange}
      />
      </div>}
    </div>
  );
};

export default NoteCard;
