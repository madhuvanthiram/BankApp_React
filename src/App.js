import logo from "./logo.svg";
import "./App.css";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import React from "react";

function App() {
  const history = useHistory();
  const viewAccounts = () => {
    history.push("/accounts");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the Bank App.Please click to view the Accounts</p>
        <Button size="small" color="primary" onClick={viewAccounts}>
          <b>View-Accounts</b>
        </Button>
      </header>
    </div>
  );
}

export default App;
