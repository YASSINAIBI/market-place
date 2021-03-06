import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Route, Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import jwt from "jwt-decode";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import Products_list from "./product_page";
import axios from "axios";
import card from "./card";

import API_URL from './../config'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home({ history }) {
  const classes = useStyles();
  const token = localStorage.getItem("token");

  let role;
  let decodedToken;

  if (token) {
    role = jwt(token).role;
    decodedToken = jwt(token);
  }

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/Home");
  };

  const handleChange = (event) => {
    localStorage.setItem("devise", event.target.value);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "gray",
          height: "100px",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/home">
              <i
                style={{ marginTop: "-2px", marginLeft: "-42%" }}
                class="fa fa-plus-square"
              >
                {" "}
                THE MARKET
              </i>
            </Link>
          </Typography>
          <div id="google_translate_element"></div>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ marginRight: "20px" }}
          >
            <InputLabel
              htmlFor="outlined-age-native-simple"
              style={{ color: "#3dff0c" }}
            >
              Devise
            </InputLabel>
            <Select
              native
              onChange={handleChange}
              label="Devise"
              inputProps={{
                name: "devise",
                id: "outlined-age-native-simple",
              }}
              style={{ border: "1px solid white", color: "#3dff0c" }}
            >
              <option aria-label="" value="" />
              <option value={"MAD"} style={{ color: "#3dff0c" }}>
                MAD
              </option>
              <option value={"EUR"} style={{ color: "#3dff0c" }}>
                EUR
              </option>
              <option value={"USD"} style={{ color: "#3dff0c" }}>
                USD
              </option>
            </Select>
          </FormControl>
          {token ? (
            <>
              {role === "seller" ? (
                <Link to="/Seller/Dashboard">
                  <Button color="inherit">DASHBOARD</Button>
                </Link>
              ) : (
                <></>
              )}
              <Button color="inherit" onClick={logOut}>
                LOG OUT
              </Button>
            </>
          ) : (
            <Link to="/Login">
              <Button variant="outlined" color="inherit">
                SIGN IN
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Route path="/Home" exact component={Products_list} />
      <Route path="/Login" exact component={Login} />
      <Route path="/Signup" exact component={Signup} />
      <Route path="/ResetPassword" exact component={ResetPassword} />
      <Route path="/Product/:id" component={card} />
    </div>
  );
}
