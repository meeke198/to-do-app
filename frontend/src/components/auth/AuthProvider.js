
import { useContext, createContext } from "react";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { login } from "./authSlice.js";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [token, setToken] = useState(localStorage.getItem("site") || "");
     const navigate = useNavigate();
     const dispatch = useDispatch();
    

     const logOut = () => {
       setUser(null);
       setToken("");
       localStorage.removeItem("site");
       navigate("/login");
     };
     const logIn = async () => {
      const res = await dispatch(login(user));
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
     };
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};