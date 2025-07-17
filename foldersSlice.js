import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  folders: ["General", "Work", "Personal", "Ideas"],
}

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action) => {
      if (!state.folders.includes(action.payload)) {
        state.folders.push(action.payload)
      }
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter((folder) => folder !== action.payload)
    },
  },
})

export const { addFolder, deleteFolder } = foldersSlice.actions
export default foldersSlice.reducer
