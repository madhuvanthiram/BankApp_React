import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 250,
    display: "inline-block",
    margin: theme.spacing(7),
  },

  title: {
    margin: theme.spacing(5),
  },

  active: {
    color: "#11cb5f",
  },
}));
const Account = () => {
  const classes = useStyles();

  const [accountData, setAccountData] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  const accountMap = [
    "transactions-1.json",
    "transactions-2.json",
    "transactions-3.json",
    "transactions-4.json",
  ];
  const handleTransactionList = (index, id) => {
    try {
      let jsonFile = accountMap[index];

      history.push({
        pathname: "/accounts:",
        search: id + "/transaction",
        state: { Data: jsonFile },
      });
    } catch (error) {
      setError("Json file is not found");
    }
  };

  const getAccountData = () => {
    fetch("accounts.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        //setloading(true);
        console.log(response);
        return response.json();
      })
      .then(
        function (myJson) {
          setAccountData(myJson);
        },
        (error) => {
          setError("Unable to find Transactions for this account");
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getAccountData();
    return function cleanup() {};
  }, []);
  if (error) {
    return (
      <div>
        <b>Error: {error} </b>
      </div>
    );
  }
  if (accountData.length > 0) {
    var accountList = accountData.map((items, index) => (
      <>
        <Card
          key={items.id}
          className={classes.card}
          variant="outlined"
          color="primary"
        >
          <CardContent>
            {items.is_active ? (
              <Typography className={classes.active} align="left">
                Active
              </Typography>
            ) : (
              <Typography color="secondary" align="left">
                Inactive
              </Typography>
            )}
            <Typography align="center">
              <b> {items.account_name}</b>
            </Typography>
            <Typography align="center">{items.account_number}</Typography>
            <Typography align="center">
              Balance {items.balance}
              {items.currency}
            </Typography>
          </CardContent>
          <CardActions align="center">
            <Button
              data-testid="button-id"
              size="medium"
              onClick={() => {
                handleTransactionList(index, items.id);
              }}
            >
              <b>View</b>
            </Button>
          </CardActions>
        </Card>
      </>
    ));
  }
  return (
    <div>
      <Typography component="h1" variant="h4" align="center">
        Bank Accounts
      </Typography>
      {accountList}
    </div>
  );
};
export default Account;
