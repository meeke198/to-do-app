
import { useContext, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [token, setToken] = useState(localStorage.getItem("site") || "");
     const navigate = useNavigate();
    

     const logOut = () => {
       setUser(null);
       setToken("");
       localStorage.removeItem("site");
       navigate("/login");
     };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};