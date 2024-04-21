import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { loginUser, fetchUser } from "../AjaxHandlers";

const Login = () => {
  //States
  const {
    values: { username, password, error, token, userInfo },
    setters: { setUsername, setPassword, setError, setToken, setUserInfo },
  } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(setUserInfo);
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = await loginUser({ username, password });
      // Handle successful login (e.g., store token in local storage, redirect user)
      console.log("Logged in successfully. Token:", authToken);
      setToken(authToken);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <div className="user-info">
        User Id: {userInfo.id} <br />
        Username: {userInfo.username} <br />
        Password: {userInfo.password}
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
