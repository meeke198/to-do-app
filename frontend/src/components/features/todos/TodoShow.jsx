
import { useDispatch } from "react-redux";
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
  const [todo, setTodo] = useState()
  const [isAlert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTodo(id))
      .unwrap()
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)
        setTodo(data)
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const handleComplete = (todo) => {
    dispatch(editTodo({...todo, status: true})).then(() => {
      navigate('/todos');
    });
  };

  const handleEdit = () => {
    dispatch(toggleEdit(true));
    navigate(`/todos/form/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
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