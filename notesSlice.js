import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  notes: [],
  nextId: 1,
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: state.nextId,
        title: action.payload.title,
        content: action.payload.content,
        folder: action.payload.folder,
        timestamp: new Date().toLocaleString(),
        createdAt: action.payload.time || new Date().toISOString(),
      }
      state.notes.push(newNote)
      state.nextId += 1
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          ...action.payload,
          timestamp: new Date().toLocaleString(),
        }
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
  },
})

export const { addNote, editNote, deleteNote } = notesSlice.actions
export default notesSlice.reducer
