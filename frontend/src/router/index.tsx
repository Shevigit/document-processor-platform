// ...existing code...
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Documents from "../pages/Documents";
import Process from "../pages/Process";

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/process/:id" element={<Process />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
// ...existing code...