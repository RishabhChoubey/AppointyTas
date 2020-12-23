import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
