/* src/features/documents/documentsSlice.ts */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document } from "../../schemas/documentSchema";

interface DocumentsState {
  items: Document[];
}

const initialState: DocumentsState = {
  items: [],
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments(state, action: PayloadAction<Document[]>) {
      state.items = action.payload;
    },
    addDocument(state, action: PayloadAction<Document>) {
      state.items.push(action.payload);
    },
  },
});

export const { setDocuments, addDocument } = documentsSlice.actions;
export default documentsSlice.reducer;
