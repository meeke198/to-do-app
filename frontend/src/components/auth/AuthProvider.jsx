// import { useContext, createContext, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "./authSlice.js";
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//     const logOut = (e) => {
//         e.preventDefault();
//       setAuthUser(null);
//       setToken("");
//       localStorage.removeItem("site");
//       navigate("/login");
//     };
    // const logIn = (user) => {
    //  dispatch(login(user))
    //    .then((res) => {
    //     console.log(res.payload.data);
    //      if (res.payload.data) {
    //        setAuthUser(res.payload.data.user);
    //        setIsLoggedIn(true);
    //        setToken(res.payload.token);
    //        localStorage.setItem("site", res.payload.token);
    //        navigate("/profile");
    //        return;
    //      }
    //    })
    //    .catch((err) => {
    //      console.error(err);
    //    });
    // };
//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         authUser,
//         setAuthUser,
//         isLoggedIn,
//         setIsLoggedIn,
//         logIn,
//         logOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


// export const useAuth = () => {
//   return useContext(AuthContext);
// };
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./authSlice.js";
import PropTypes from "prop-types";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logIn = (authUser) => {
    dispatch(login(authUser))
      .then((res) => {
        console.log(res.payload);
        if (res.payload) {
          setAuthUser(res.payload.user);
          setIsLoggedIn(true);
          setToken(res.payload.token);
          localStorage.setItem("token", res.payload.token.slice(7));
          navigate("/dashboard");
          return res;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
   const logOut = () => {
     setAuthUser(null);
     setToken("");
     localStorage.removeItem("token");
     navigate("/login");
   };
  return (
    <AuthContext.Provider value={{ token, authUser, isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};