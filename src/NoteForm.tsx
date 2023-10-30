import {Form, Stack, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { useRef, FormEvent, useState } from 'react';
import { NoteData, Tag } from './App';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
}

export function NoteForm({ onSubmit }: NoteFormProps ) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markDownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tag: []
    })
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control ref={titleRef} required />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="tags">
                  <Form.Label>Tags</Form.Label>
                  <CreatableReactSelect value={selectedTags.map(tag => {
                    return {label: tag.label, value: tag.id}
                  })}
                  onChange={tags => {setSelectedTags(tags.map(tag => {
                    return {label: tag.label, id: tag.value}
                  }))}} isMulti />
                </Form.Group>
            </Col>            
            <Col>
                <Form.Group controlId="markdown">
                  <Form.Label>Body</Form.Label>
                  <Form.Control ref={markDownRef} as="textarea" required rows={4} />
                </Form.Group>
            </Col>            
            </Row>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-content-end pt-2">
          <Button type='submit' variant='primary'>Save</Button>
          <Link to="../">
            <Button type="button" variant='outline-secondary'>Cancel</Button>
          </Link>
        </Stack>
      </Form>
    </>
  )
}