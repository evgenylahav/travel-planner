import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(3),
        marginTop: 100,
        width: "25ch",
      },
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  })
);

export default function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        component={Link}
        to="/configuration"
        variant="contained"
        color="primary"
        className={classes.button}
        style={{ marginRight: "10px" }}
      >
        Guided
      </Button>
      <Button
        component={Link}
        to="/itinerary"
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Manual
      </Button>
    </div>
  );
}
