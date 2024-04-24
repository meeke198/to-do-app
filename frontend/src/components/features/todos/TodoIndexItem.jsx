import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import "./todo.css"
const TodoIndexItem = ({ todo }) => {
  
  return (
    <div className="todo-article" key={todo?._id}>
      <Link
        style={{
          width: "100%",
          alignContent: "center",
          textDecoration: "none",
          color: "black",
        }}
        to={`/todos/${todo?._id}`}
      >
        <h3 className="todo-article">{todo?.name}</h3>
        <Button
          variant="outlined"
          color="error"
        >
          Show todo
        </Button>
      </Link>
    </div>
  );
};

TodoIndexItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoIndexItem;
