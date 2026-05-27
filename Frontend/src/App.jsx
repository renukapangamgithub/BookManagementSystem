import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export const serverURL = "http://localhost:5000";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;