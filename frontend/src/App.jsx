import "./App.css";
import { Route, Routes } from "react-router-dom";
import {TodoRoutes} from "./routes/TodoRoutes";
import Home from "./components/features/pages/Home";
import NavBar from "./components/features/navbar/NavBar";
import Login from "./components/auth/Login";
import AuthProvider from "./hooks/AuthProvider";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <AuthProvider>
          <Route path="/login" element={<Login />} />
        </AuthProvider>
        <Route path="/" element={<Home />} />
        <Route path="/todos/*" element={<TodoRoutes />} />
      </Routes>
    </>
  );
}

export default App;
