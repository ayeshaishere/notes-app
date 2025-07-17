"use client"

import { Card, CardContent, Typography, IconButton, Chip } from "@mui/material"
import { useDispatch } from "react-redux"
import { deleteNote } from "../features/notes/notesSlice"

const NoteCard = ({ note, onEdit }) => {
  const dispatch = useDispatch()

  // Add safety check for note prop
  if (!note) {
    return null
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(note)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(note.id))
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: "#2c2c2c",
        color: "#fff",
        mb: 2,
        "&:hover": {
          backgroundColor: "#3c3c3c",
        },
      }}
    >
      <CardContent>
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
            {note.title || "Untitled"}
          </Typography>
          <Chip
            label={`📁 ${note.folder || "General"}`}
            size="small"
            sx={{ backgroundColor: "#4c4c4c", color: "#fff" }}
          />
        </div>

        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
          {note.content || "No content"}
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption" sx={{ color: "#aaa" }}>
            {note.timestamp || "No date"}
          </Typography>

          <div>
            <IconButton onClick={handleEdit} color="primary" size="small" title="Edit note">
              <span style={{ fontSize: "16px" }}>✏️</span>
            </IconButton>
            <IconButton onClick={handleDelete} color="error" size="small" title="Delete note">
              <span style={{ fontSize: "16px" }}>🗑️</span>
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NoteCard
