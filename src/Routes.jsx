import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TransactionListing from "./Components/TransactionListing";
import TransactionDetails from "./Components/TransactionDetails";
import Account from "./Components/Account";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/accounts:" component={TransactionListing} />
        <Route path="/transactions:" component={TransactionDetails} />
        <Route path="/accounts" component={Account} />
      </Switch>
    </Router>
  );
};

export default Routes;
