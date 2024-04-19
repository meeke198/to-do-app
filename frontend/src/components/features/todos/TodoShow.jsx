import { useDispatch, useSelector } from "react-redux";
import {
  editTodo,
  fetchTodo,
  toggleEdit,
} from "../../../redux/todoSlice";
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
  console.log({ todo });
  const [isAlert, setAlert] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchTodo(id));
    };
    fetchData();
  }, [dispatch]);

  const handleComplete = (todo) => {
    const updatedTodo = { ...todo, status: true };
    console.log({ updatedTodo });
    dispatch(editTodo(updatedTodo));
  };
   const handleEdit = () => {
     dispatch(toggleEdit(true));
    navigate(`/todos/form/${id}`)
   };
  //  const handleDelete = (id) => {
  //   alert("Are you sure you want to delete")
  //    dispatch(deleteTodo(id));
  //   navigate(`/todos`)
  //  };

  return (
    <>
      {isAlert ? (
        <CustomAlert id={id}/>
      ) : (
        <>
          {" "}
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
