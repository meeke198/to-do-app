import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {TodoRoutes} from "./routes/TodoRoutes";
import Home from "./components/features/pages/Home";
import NavBar from "./components/features/navbar/NavBar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AuthProvider from "./components/auth/AuthProvider";
import PrivateRoute from "./components/auth/PrivateRoutes";
import Dashboard from "./components/auth/Dashboard";
function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/todos/*" element={<TodoRoutes />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;