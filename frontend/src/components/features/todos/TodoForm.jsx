import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./todo.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import {
  createTodo,
  fetchTodo,
  editTodo,
  toggleEdit,
} from "../../../redux/todoSlice";

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = useSelector((state) => state.todos.isEdit);
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  console.log({ isEdit });
  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        const data = await dispatch(fetchTodo(id));
        setTodo(data.payload);
        console.log({ data });
        setName(data.payload.name);
      };
      fetchData();
    }
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
          const updatedPost = { id: todo._id, name, status: todo.status };
          console.log({ updatedPost });
          setName("");
          dispatch(editTodo(updatedPost));
    } else {
      const newTodo = {
        name,
        status: false,
      };
      dispatch(createTodo(newTodo));
      setName(""); 
    } 
    navigate("/todos")
  };

  return (
    <div className="form-container">
      <Typography className="typography" component="h1" variant="h5">
        {isEdit ? "Edit Post" : "Create new post"}
      </Typography>
      <Box
        className="form-container"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="title"
          name="title"
          placeholder="Enter todo here"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isEdit ? "Edit post" : "Create post"}
        </Button>
      </Box>
    </div>
  );
};

export default TodoForm;
