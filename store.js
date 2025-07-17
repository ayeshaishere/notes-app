import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import notesReducer from "../features/notes/notesSlice"
import foldersReducer from "../features/folders/foldersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    folders: foldersReducer,
  },
})
