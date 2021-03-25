import Table from "@material-ui/core/Table";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  Button: {
    margin: theme.spacing(2),
  },
}));
const TransactionListing = (props) => {
  const [error, setError] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [transactionData, setTransactionData] = useState([]);
  const jsonFile = location.state.Data;
  const goHome = () => {
    history.goBack();
  };

  useEffect(() => {
    getTransactionList();
  });
  const getTransactionList = () => {
    let url = "/" + jsonFile;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          setTransactionData(myJson);
        },
        (error) => {
          setError("Unable to find TransactionsDetails for this account");
          console.log(error);
        }
      );
  };
  if (error) {
    return (
      <div>
        <b>Error: {error} </b>
      </div>
    );
  }
  const handleTransactionDetails = (index, id) => {
    try {
      history.push({
        pathname: "/transactions:",
        search: id + "/transactiondetails",
        state: { Details: transactionData[index] },
      });
    } catch (error) {
      setError("Transaction details cannaot be fetched");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Button
        className={classes.Button}
        onClick={goHome}
        variant="outlined"
        color="primary"
      >
        Go To Main Accounts
      </Button>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Account_Id</TableCell>
            <TableCell align="center">Account_Type</TableCell>
            <TableCell align="center">Transaction_Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {{ transactionData } &&
            transactionData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.account_id}</TableCell>
                <TableCell align="center">{row.from}</TableCell>
                <TableCell align="center">{row.transaction_date}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">
                  <VisibilityOutlinedIcon
                    color="primary"
                    onClick={() => {
                      handleTransactionDetails(index, row.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionListing;
