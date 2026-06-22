import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import Dashboard from "./pages/Dashboard";
import PendingTask from "./pages/PendingTask";
import CompletedTask from "./pages/CompletedTask";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<WebLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pending" element={<PendingTask />} />
            <Route path="/complete" element={<CompletedTask />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
