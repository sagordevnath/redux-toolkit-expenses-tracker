import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewAll from "./pages/ViewAll";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewAll" element={<ViewAll />} />
      </Routes>
    </BrowserRouter>
  );
}
