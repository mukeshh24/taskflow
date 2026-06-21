import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import Dashboard from "./pages/Dashboard";
import PendingTask from "./pages/PendingTask";
import CompletedTask from "./pages/CompletedTask";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/pending" element={<PendingTask />} />
          <Route path="/complete" element={<CompletedTask />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
