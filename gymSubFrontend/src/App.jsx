import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthContext";
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Dashboard from "./components/subscriptions/Dashboard"
import ProtectedRoute from "./components/auth/ProtectedRoute"

export default function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<Dashboard />}/>
            <Route path="*" element={<Login />} />
            <Route
              path="/signup"
              element={
                  <Signup />
              }
            />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
  )
}

