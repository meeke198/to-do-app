import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../../redux/todoSlice";
import TodoIndexItem from "./TodoIndexItem";

const TodoIndex = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  // const completedTodos = useSelector((state) => state.todos.completedTodos);
  const [isShowComplete, setIsShowComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTodos());
    };
    fetchData();
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
        {todos?.filter((todo) => todo.status === isShowComplete)
          ?.map((todo) => (
            <TodoIndexItem key={todo?._id} todo={todo} />
          ))}
      </div>
    </>
  );
};


export default TodoIndex;