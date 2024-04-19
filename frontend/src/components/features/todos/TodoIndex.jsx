import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, fetchCompletedTodos } from "../../../redux/todoSlice";
import TodoIndexItem from "./TodoIndexItem";

const TodoIndex = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const completedTodos = useSelector((state) => state.todos.completedTodos);
  const [isShowComplete, setIsShowComplete] = useState(false);
  console.log({ isShowComplete });
  console.log({ todos });
  console.log({ completedTodos });
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCompletedTodos());
  }, [dispatch]);
  return (
    <>
      <h3 style={{ marginTop: "4rem" }}>
        {isShowComplete ? "Completed todo(s) list" : "Todo List"}
      </h3>
      <label
        style={{ marginBottom: "2rem", display: "inline-block" }}
        className="switch"
      >
        <input
          onClick={() => setIsShowComplete((prev) => !prev)}
          type="checkbox"
        />
        <span className="slider round"></span>
      </label>

      <div>
        {!isShowComplete
          ? todos?.map((todo) => <TodoIndexItem key={todo?._id} todo={todo} />)
          : completedTodos?.map((todo) => (
              <TodoIndexItem key={todo?._id} todo={todo} />
            ))}
      </div>
    </>
  );
};

export default TodoIndex;
