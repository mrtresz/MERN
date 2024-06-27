import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { CreateBook } from "./components/CreateBook";
import { ShowBook } from "./components/ShowBook";
import { EditBook } from "./components/EditBook";
import { DeleteBook } from "./components/DeleteBook";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
