import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext"; 

const Logout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Logout component rendered"); // Log when the component renders

  const handleLogout = async () => {

    try {
      const response = await fetch("http://localhost:5174/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
      });
      if (response.ok) {
        window.location.href = '/login'
      }
    } catch(error){
      console.error('Error during logout:', error);
    }
    localStorage.removeItem("isAuthenticated");
    console.log("isAuthenticated removed from localStorage"); // Log after removing from localStorage

    // Update authentication state in context
    setIsAuthenticated(false);
    console.log("isAuthenticated set to false in context"); // Log after updating context

    // Redirect to the login page
    navigate("/login");
    console.log("Redirecting to /login"); // Log before navigating to the login page

  };

  const handleCancel = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <>
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Popup */}
      <div className="logout-popup">
        <h2>Are you sure you want to log out?</h2>
        <div className="button-container">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;