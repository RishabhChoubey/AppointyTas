import React, { useEffect } from "react";
import Axios from "axios";
import queryString from "query-string";

import Cookies from "js-cookie";
import Style from "./Login.module.css";
import { LoginIcon, GitIcon } from "../icon/Icon";
const Login = (props) => {
  const value = queryString.parse(props.location.search);

  const code = value.code;

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    if (code) {
      Axios.post(
        "/auth",
        {
          client_id: "893aad47e9596025d42c",
          client_secret: "16ac8e8a8c7722bc22d9a3580abfccc1ec257074",
          code,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).then((res) => {
        console.log(res.data, "login");
        Cookies.set("token", JSON.stringify(res.data));
        props.history.index = -1;

        props.history.push("/code");
      });
    }
  }, [props.history, code]);

  return (
    <div className={Style.container}>
      <div className={Style.circle}></div>
      <div className={Style.circle2}></div>
      <div className={Style.circle3}></div>
      <div className={Style.circle4}></div>
      <div className={Style.sub_con}>
        <a href="https://github.com/login/oauth/authorize?client_id=893aad47e9596025d42c&client_secret=16ac8e8a8c7722bc22d9a3580abfccc1ec257074&scope=repo,user,email">
          <div className={Style.link}>
            <img src={GitIcon} className={Style.icon} alt="" /> login{" "}
            <img src={LoginIcon} alt="" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Login;
