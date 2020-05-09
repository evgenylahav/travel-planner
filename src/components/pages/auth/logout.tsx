import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoggedIn } from "../../../actions/authActions";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("logging out...");
    dispatch(updateLoggedIn(false));
    Cookies.remove("session");
    history.push("/login");
  }, [history]);

  return <div>Logging out!</div>;
}
