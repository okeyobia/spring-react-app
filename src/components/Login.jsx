import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CarList from "./CarList";
import { SERVER_URL } from "../constants.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        } else {
          toast.warn("Check your username and password", {
            position: toast.POSITION.TOP_CENTER
          });
        }
      })
      .catch(err => console.error(err));
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  if (isAuthenticated) {
    return <CarList />;
  } else {
    return (
      <div>
        <TextField name="username" label="Username" onChange={handleChange} />
        <br />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button color="primary" variant="outlined" onClick={login}>
          Login
        </Button>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
};

export default Login;
