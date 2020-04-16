import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@material-ui/core";

import Draggable from "react-draggable";

function PaperComponent(props: any) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EditDay(props: any) {
  const classes = useStyles();

  const { show, close, dayName, updateDayName } = props;
  const [dayNameState, setDayNameState] = useState(dayName);

  console.log(dayNameState);

  const handleDayNameChange = (value: string) => {
    setDayNameState(value);
  };

  const handleConfirm = () => {
    updateDayName(dayNameState);
    close();
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Edit a Day Name
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label={"Edit day name"}
              variant="outlined"
              value={dayNameState}
              onChange={(e) => handleDayNameChange(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            disabled={dayNameState === ""}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
