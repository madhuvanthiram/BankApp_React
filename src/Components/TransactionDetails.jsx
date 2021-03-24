import { useLocation, useHistory } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
const useStyles = makeStyles({
  root: {
    minWidth: "50%",
    margin: 5,
  },

  title: {
    fontSize: 14,
  },
  Button: {
    margin: 12,
  },
});
const TransactionDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const goBack = () => {
    history.goBack();
  };

  const details = location.state.Details;
  return (
    <div>
      <Button
        className={classes.Button}
        variant="outlined"
        color="primary"
        onClick={goBack}
        data-testid="back-id"
      >
        Back
      </Button>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography color="textprimary">
            <b>AccId:</b>
            {details.account_id}
          </Typography>
          <Typography color="primary">
            <b>{details.from}</b>
          </Typography>
          <Typography color="textprimary">
            <b>Description:</b> {details.description}
          </Typography>
          <Typography color="textprimary">
            <b>Date:</b> {details.transaction_date}
          </Typography>
          <Typography color="textprimary">
            <b> Processed:</b>
            {details.transaction_processed ? (
              <CheckIcon color="primary" />
            ) : (
              <CloseIcon color="secondary" />
            )}
          </Typography>
          <Typography color="textprimary">
            <b>Amount:</b>
            {details.amount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default TransactionDetails;
