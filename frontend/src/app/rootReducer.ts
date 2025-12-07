// ...existing code...
import { combineReducers } from "@reduxjs/toolkit";
import { filesApi } from "../features/files/filesApi";
import filesReducer from "../features/files/filesSlice";

export default combineReducers({
  files: filesReducer,
  [filesApi.reducerPath]: filesApi.reducer,
});
// ...existing code...