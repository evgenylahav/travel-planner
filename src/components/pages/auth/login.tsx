import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
  Link,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Typography,
} from "@material-ui/core/";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { LoginRequest } from "../../../reducers/interfaces";
import { resetCurrentTrip } from "../../../actions/tripsActons";
import { resetCurrentPlace } from "../../../actions/placesActions";
import { resetCurrentDay } from "../../../actions/daysActions";
import { setSessionCookie, SessionContext } from "../../session";
import { updateLoggedIn } from "../../../actions/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const session = useContext(SessionContext);
  if (session.user !== undefined) {
    history.push("/itinerary");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const auth = useSelector((state: RootState) => state.auth);
  // const loggedIn = auth.loggedIn;

  const handleLogin = () => {
    const signUpReq: LoginRequest = {
      email: email,
      password: password,
    };
    console.log(signUpReq);
    fetch("/login_to", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpReq),
    })
      .then((res: any) => res.json())
      .then((data) => {
        const user = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
        };
        if (data.status) {
          dispatch(resetCurrentTrip());
          dispatch(resetCurrentPlace());
          dispatch(resetCurrentDay());
          setSessionCookie({ user: user });
          // dispatch(updateLoggedIn(true));
          history.push("/itinerary");
        } else {
          dispatch(updateLoggedIn(false));
          history.push("/login");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          style={{ alignSelf: "normal" }}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
