import { useDispatch, useSelector } from "react-redux";
import { editTodo, fetchTodo } from "../../../redux/todoSlice";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import "./todo.css";
import { useEffect } from "react";

const TodoShow = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const todo = useSelector(state => state.todos.todo);
  console.log({ todo });
  useEffect(() => {
    const fetchData = () => {
     dispatch(fetchTodo(id));
    };
    fetchData();
  }, [dispatch]);

  const handleComplete = (todo) => {
    const updatedTodo = { ...todo, status: true };
    dispatch(editTodo(updatedTodo));
  };

  return (
    <article className="todo-article" key={todo?.id}>
        <h3>{todo?.name}</h3>
        <Button variant="outlined" color="error" sx={{ marginRight: "1rem" }}>
        Edit todo
      </Button>
        <Button
          onClick={() => handleComplete(todo)}
          variant="outlined"
          color="error"
        >
          Complete
        </Button>
    </article>
  );
};

export default TodoShow;
