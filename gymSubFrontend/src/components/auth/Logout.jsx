import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
export default function Logout(){
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(); // Clear authentication status
      navigate("/login"); // Redirect to login
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}