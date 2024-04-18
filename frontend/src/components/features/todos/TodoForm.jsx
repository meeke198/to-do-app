import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./todo.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createTodo } from "../../../redux/todoSlice";

const TodoForm = () => {
  //  const { id } = useParams();
  //  const editStatus = useSelector((state) => state.posts.editStatus);
  //  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  //  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //  if (editStatus && id) {
    //    dispatch(fetchTodo(id)).then((action) => {
    //      setTitle(action.payload.title);
    //      setBody(action.payload.body);
    //    });
    //  }
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //  if (editStatus) {
    //    const updatedPost = { id, title, body };
    //    const response = await dispatch(editPost(updatedPost));
    //    setMessage(response.payload.message);
    //  } else {
    const newTodo = {
      name,
      status: false,
    };
    dispatch(createTodo(newTodo));
    setName("");
    //  setStatus("");
    //  }
  };

  return (
    <div className="form-container">
      {/* {message ? (
        <>
          <Typography
            sx={{ color: "green", height: "5rem" }}
            component="h1"
            variant="h5"
          >
            {message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link style={{color: "black"}} to="/">Back to home</Link>
          </Button>
        </>
      ) : ( */}
      <>
        <Typography className="typography" component="h1" variant="h5">
          {/* {editStatus ? "Edit Post" : "Create new post"} */} Create todo
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
            {/* {editStatus ? "Edit post" : "Create post"} */}
            Create new todo
          </Button>
        </Box>
      </>
      {/* )} */}
    </div>
  );
};

export default TodoForm;
