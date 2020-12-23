import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "../component/Login";
import Container from "../component/Container";

import IssuePage from "../component/IssuePage";
import { useHistory } from "react-router-dom";
import RepoDetail from "../component/RepoDetail";

const Router = (props) => {
  const history = useHistory();

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    history.listen((newLoc, action) => {
      if (action === "PUSH") {
      }
      if (action === "POP") {
        console.log(newLoc.pathname);
        if (newLoc.pathname === "/") {
          history.go(1);
        }
      }
    });
  }, []);

  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route exact path="/code" component={Container} />
      <Route exact path="/detail/:id" component={RepoDetail} />
      <Route exact path="/issue/:id" component={IssuePage} />
    </div>
  );
};

export default Router;
