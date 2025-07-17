function Note({ note, onDelete, onUpdate }) {
  return (
    <div className="note">
      <div className="note-header">
        <small className="timestamp">{note.timestamp}</small>
      </div>
      <p>{note.text}</p>
      <div className="actions">
        <button onClick={() => onUpdate(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Note;
