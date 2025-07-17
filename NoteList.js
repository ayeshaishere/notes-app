import Note from './Note';

function NoteList({ notes, onDelete, onUpdate }) {
  return (
    <div className="note-list">
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default NoteList;
