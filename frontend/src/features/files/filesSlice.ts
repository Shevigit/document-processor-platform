import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type FilesState = {
  selectedId: string | null;
};

const initialState: FilesState = {
  selectedId: null,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    selectFile: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
  },
});

export const { selectFile } = filesSlice.actions;
export default filesSlice.reducer;