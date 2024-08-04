import { useState } from 'react'
import './App.css'
import NoteComponent from './components/AddNote/AddNote'
import ArchivedNotes from './components/ArchivedNotes/ArchivedNotes'
import AllNotes from './components/NotesContainer/AllNotes'
import Sidebar from './components/Sidebar/Sidebar'
import DeletedNotes from './components/DeletedNotes/DeletedNotes'
function App() {
  const [currentselection,setCurrentSelection] = useState('Notes');
  function handleChangeSelection(selection:string){
       setCurrentSelection(selection)
  }
  function showSelectedSection(){
    if(currentselection=='Notes'){
      return <AllNotes/>
    }
    else if(currentselection=='Archive'){
      return <ArchivedNotes/>
    }
    else if(currentselection=='Trash'){
      return <DeletedNotes/>
    }
  }
  return (
    <div className='homepage-layout'>
      <div className='homepage-left'>
     <Sidebar handleChangeSelection={handleChangeSelection}/>
     </div>
     <div className='homepage-right'>
     <NoteComponent/>
     {showSelectedSection()}
     </div>
    </div>
  )
}

export default App
