import { Routes, Route } from "react-router-dom";
import TodoIndex from "../components/features/todos/TodoIndex";
import TodoShow from "../components/features/todos/TodoShow";
import TodoForm from "../components/features/todos/TodoForm";

export function TodoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TodoIndex />} />
      <Route path=":id" element={<TodoShow />} />
      <Route path="form" element={<TodoForm />} />
      <Route path="form/:id" element={<TodoForm />} />
    </Routes>
  );
}
