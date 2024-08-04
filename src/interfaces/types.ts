// store/types.ts

interface Note {
  uid: string;
  title: string;
  content: string;
  reminder?: string;
  imageUrl?: string;
  isPinned: boolean;
  isArchived: boolean;
  color:string;
}

interface UpdateNotePayload {
  uid: string;
  title?: string;
  content?: string;
  reminder?: string;
  imageUrl?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  color?:string;
}

interface NotesState {
  notes: Note[];
  deletedNotes: Note[];
}
interface NoteCardProps {
  note: Note;
  onDelete: (uid: string) => void;
  onUpdate: (uid: string, fieldsToUpdate: Partial<Note>) => void;
  deletedNotes:boolean,
}
interface SidebarProps {
  handleChangeSelection: (selection: string) => void;
}

export type { Note, UpdateNotePayload, NotesState,NoteCardProps,SidebarProps };
