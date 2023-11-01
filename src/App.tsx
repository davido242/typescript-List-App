import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { useMemo } from 'react';

export type Note = {
  id: string,
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type NoteData = {
  title: string,
  markdown: string,
  tag: Tag[]
}

export type Tag = {
  id: string,
  label: string
}



function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidv4()}]
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h2>Hi Tania</h2>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h3>Show</h3>} />
          <Route path="edit" element={<h3>Edit</h3>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;