import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from './NewNote';


export type RawNote = {
  id: string
}

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type Note = {
  id: string,
} & NoteData

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
  const [notes, setNotes] = useLocalStrorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStrorage<Tag[]>("TAGS", []);
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