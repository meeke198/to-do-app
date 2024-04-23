
import { useDispatch, useSelector } from "react-redux";
import { editTodo, fetchTodo, toggleEdit } from "../../../redux/todoSlice";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./todo.css";
import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";

const TodoShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const todo = useSelector((state) => state.todos.todo);
  const [isAlert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    dispatch(fetchTodo(id))
      .then(() => setIsLoading(false)) // Set loading state to false after data is fetched
      .catch((error) => {
        console.error("Error fetching todo:", error);
        setIsLoading(false); // Set loading state to false in case of an error
      });
  }, [dispatch, id]);

  const handleComplete = (todo) => {
    const updatedTodo = { ...todo, id: todo._id, status: true };
    dispatch(editTodo(updatedTodo));
  };

  const handleEdit = () => {
    dispatch(toggleEdit(true));
    navigate(`/todos/form/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  return (
    <>
      {isAlert ? (
        <CustomAlert id={id} />
      ) : (
        <>
          <article className="todo-article" key={todo?.id}>
            {todo ? (
              <>
                <h3>{todo?.name}</h3>
                <Button
                  onClick={handleEdit}
                  sx={{ marginRight: "1rem" }}
                  variant="outlined"
                  color="error"
                >
                  Edit todo
                </Button>
                <Button
                  onClick={() => handleComplete(todo)}
                  variant="outlined"
                  color="error"
                >
                  Complete
                </Button>
                <Button
                  sx={{ marginLeft: "1rem" }}
                  onClick={() => setAlert(true)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </>
            ) : null}
          </article>
        </>
      )}
    </>
  );
};

export default TodoShow;