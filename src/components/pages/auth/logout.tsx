import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export const Logout = () => {
  let history = useHistory();
  useEffect(() => {
    Cookies.remove("session");
    history.push("/login");
  }, [history]);

  return <div>Logging out!</div>;
};
