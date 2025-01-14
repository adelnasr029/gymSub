import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/AuthContext";
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Logout from "./components/auth/Logout";
import Dashboard from "./components/subscriptions/Dashboard"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import SubscriberDetails from "./components/subscriptions/SubscriberDetails";



export default function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }/>
             <Route
                path="/subscriber/:id"
                element={
                  <ProtectedRoute>
                    <SubscriberDetails />
                  </ProtectedRoute>
                }/>
              <Route
                path="/signup"
                element={
                  <ProtectedRoute>
                    <Signup />
                  </ProtectedRoute>
                }/>
              <Route
                path="/logout"
                element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
                }
              />
              <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
  )
}

