"use client"

import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { addNote, editNote } from "../features/notes/notesSlice"
import { logout } from "../features/auth/authSlice"
import NoteCard from "../components/NoteCard"

import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Alert,
} from "@mui/material"

const NotesDashboard = () => {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes.notes) // Fixed: access notes.notes
  const folders = useSelector((state) => state.folders.folders) // Fixed: access folders.folders
  const { user } = useSelector((state) => state.auth)

  const [noteData, setNoteData] = useState({ title: "", content: "", folder: "General" })
  const [editId, setEditId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!noteData.title.trim() || !noteData.content.trim()) {
      alert("Please fill in both title and content")
      return
    }

    const payload = {
      ...noteData,
      time: new Date().toISOString(),
    }

    if (editId) {
      dispatch(editNote({ ...payload, id: editId }))
    } else {
      dispatch(addNote(payload))
    }

    // Reset form
    setNoteData({ title: "", content: "", folder: "General" })
    setEditId(null)
  }

  const handleEdit = (note) => {
    setNoteData({
      title: note.title,
      content: note.content,
      folder: note.folder,
    })
    setEditId(note.id)
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancel = () => {
    setNoteData({ title: "", content: "", folder: "General" })
    setEditId(null)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  // Add safety check for notes and folders
  const safeNotes = notes || []
  const safeFolders = folders || ["General"]

  return (
    <>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📝 My Notes App
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <span style={{ fontSize: "18px" }}>🚪</span>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, pb: 4 }}>
        {/* Form Section */}
        <Box sx={{ mb: 4, p: 3, backgroundColor: "#1e1e1e", borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
            {editId ? "✏️ Edit Note" : "➕ Add New Note"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Title"
                  value={noteData.title}
                  onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "#aaa" },
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#777" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Content"
                  multiline
                  rows={1}
                  value={noteData.content}
                  onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "#aaa" },
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#777" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  select
                  fullWidth
                  label="Folder"
                  value={noteData.folder}
                  onChange={(e) => setNoteData({ ...noteData, folder: e.target.value })}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#aaa" },
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#777" },
                    },
                  }}
                >
                  {safeFolders.map((folder, i) => (
                    <MenuItem key={i} value={folder}>
                      {folder}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex", gap: 1, height: "100%" }}>
                  <Button type="submit" variant="contained" fullWidth sx={{ minHeight: "56px" }}>
                    {editId ? "✏️ Update" : "➕ Add"}
                  </Button>
                  {editId && (
                    <Button variant="outlined" onClick={handleCancel} sx={{ minHeight: "56px", minWidth: "80px" }}>
                      ❌ Cancel
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>

        <Divider sx={{ mb: 3, backgroundColor: "#333" }} />

        {/* Notes Display Section */}
        <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
          📋 Your Notes ({safeNotes.length})
        </Typography>

        {safeNotes.length === 0 ? (
          <Alert severity="info" sx={{ backgroundColor: "#2c2c2c", color: "#fff" }}>
            📝 No notes yet. Create your first note using the form above!
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {safeNotes.map((note) => (
              <Grid item xs={12} md={6} lg={4} key={note.id}>
                <NoteCard note={note} onEdit={handleEdit} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}

export default NotesDashboard
