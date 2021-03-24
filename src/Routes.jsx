import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TransactionListing from "./Components/TransactionListing";
import TransactionDetails from "./Components/TransactionDetails";
import Account from "./Components/Account";
import App from "./App";
const Routes = () => {
  console.log("inside routes");
  return (
    <Router>
      <Switch>
        <Route path="/accounts" component={Account} />
        <Route path="/accounts:" component={TransactionListing} />
        <Route path="/transactions:" component={TransactionDetails} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default Routes;
