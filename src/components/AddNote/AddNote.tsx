import { useDispatch } from 'react-redux';
import { addNote } from '../../redux/notesSlice';
import { useState,ChangeEvent } from 'react';
import "../../styles/AllNotes.css"
import { IoIosCheckboxOutline } from "react-icons/io";
import { HiMiniPaintBrush } from "react-icons/hi2";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { MdOutlinePushPin,MdPushPin } from "react-icons/md";
import { MdOutlineAddAlert } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineImage } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

const NoteComponent = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddNote = () => {
    if (title !== '' || content !== '') {
      dispatch(addNote(
        title,
        content,
        isPinned,
        imageUrl,
      ));
      setTitle('');
      setContent('');
      setIsPinned(false);
      setImageUrl('');
      setIsFocused(false);
    }
  };

  const handleClose = () => {
    setIsFocused(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='add-note-container'>
      <div className='add-note-title-container'>
        <input
          type="text"
          placeholder={isFocused ? "Title" : "Take a Note...."}
          value={title}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title"
        />
        {!isFocused ?
          <div className='note-title-suboptions'>
            <div><IoIosCheckboxOutline /></div>
            <div><HiMiniPaintBrush /></div>
            <div><MdOutlineInsertPhoto /></div>
          </div> :
          <div onClick={() => setIsPinned(!isPinned)} className='note-icon'>
            {isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
          </div>}
      </div>
      {isFocused ?
        <div className='note-content-container'>
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-content"
          />
          {imageUrl && <img src={imageUrl} alt="Selected" className="note-image-preview" />}
          <div className="note-options">
            <div className='note-options-left'>
              <div className='note-icon'><MdOutlineAddAlert /></div>
              <div className='note-icon'><HiOutlineUserAdd /></div>
              <div className='note-icon'><IoColorPaletteOutline /></div>
              <label className='note-icon'>
                <MdOutlineImage />
                <input
                  type="file"
                  accept="image/*"
                  className="note-image-input"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              <div className='note-icon'><MdOutlineArchive /></div>
              <div className='note-icon'><IoMdMore /></div>
            </div>
            <div className='note-options-right'>
              <button onClick={handleClose} className="note-close-button">
                Cancel
              </button>
              <button onClick={handleAddNote} className="note-add-button">
                Add
              </button>
            </div>
          </div>
        </div> : null}
    </div>
  );
};

export default NoteComponent;
