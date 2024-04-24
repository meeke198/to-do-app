import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Dashboard = () => {
  const {
    authUser,
    isLoggedIn,
    logOut,
  } = useAuth();
  return (
    <div className="container">
      <div>
        <h1>Welcome! {authUser?.email}</h1>
        {isLoggedIn ? (
          <button onClick={() => logOut()} className="btn-submit">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn-submit">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
