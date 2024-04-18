import "./App.css";
import { Route, Routes } from "react-router-dom";
import {TodoRoutes} from "./routes/TodoRoutes";
import Home from "./components/features/pages/Home";
import NavBar from "./components/features/navbar/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/*" element={<TodoRoutes />} />
      </Routes>
    </>
  );
}

export default App;
