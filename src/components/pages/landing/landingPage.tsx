import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button, Typography, Grid } from "@material-ui/core/";

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
    <div id="main">
      <Typography variant="h1" align="center" style={{ color: "#2196F3" }}>
        Travel Planner
      </Typography>
      <Typography variant="h3" align="center" style={{ marginTop: "40px" }}>
        The new way to plan and manage your trps
      </Typography>
      <div style={{ width: "50%", margin: "0 auto", marginTop: "40px" }}>
        <Grid>
          {/* container spacing={2} align="center"> */}
          <Grid item xs={4}></Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              style={{ backgroundColor: "#2196F3" }}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              style={{ backgroundColor: "#2196F3" }}
            >
              Signup
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
    </div>
  );
}
