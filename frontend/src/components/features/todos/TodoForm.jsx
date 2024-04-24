import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./todo.css";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTodo,
  fetchTodo,
  editTodo
} from "../../../redux/todoSlice";

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    name: '',
    status: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchTodo(id))
        .unwrap()
        .then((data) => {
          setTodo(data)
        })
        .catch(err => {
          console.log("🚀 ~ useEffect ~ err:", err)
        })
    }
  }, []);

  const handleChangeName = (e) => {
    setTodo({
      ...todo,
      name: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {      
      dispatch(editTodo(todo)).then(() => {
        navigate("/todos")
      });

    } else {      
      dispatch(createTodo(todo)).then(() => { 
        navigate("/todos")
      });      
    } 
  };

  return (
    <div className="form-container">
      <Typography className="typography" component="h1" variant="h5">
        {id ? "Edit Post" : "Create new post"}
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
          value={todo?.name ?? ''}
          onChange={handleChangeName}
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
          {id ? "Edit post" : "Create post"}
        </Button>
      </Box>
    </div>
  );
};

export default TodoForm;
