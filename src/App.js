import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography>Carlist</Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
