import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, fetchCompletedTodos } from "../../../redux/todoSlice";
import TodoIndexItem from "./TodoIndexItem";

const TodoIndex = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const completedTodos = useSelector((state) => state.todos.completedTodos);
console.log({todos});
console.log({ completedTodos });
  useEffect( () => {
    const fetchData = async () => {
      dispatch(fetchTodos());
      dispatch(fetchCompletedTodos());
    }
    fetchData()
  }, [dispatch]);

  return (
    <>
      <h3 style={{ marginTop: "4rem" }}>This is the todo index page</h3>
      <div>
        {todos?.map((todo) => (
          <TodoIndexItem key={todo?._id} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default TodoIndex;