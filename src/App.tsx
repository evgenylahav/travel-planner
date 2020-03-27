import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    fetch("/time")
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
      });
  }, []);
  return (
    <div className={classes.root}>
      <header className="App-header">
        <p>The current time is: {currentTime}</p>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </header>
    </div>
  );
}

export default App;
