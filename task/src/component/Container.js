import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Style from "./Container.module.css";
import Repo from "./Repo";
import UserDetail from "./UserDetail";
import { useHistory } from "react-router-dom";

const Container = () => {
  const token = Cookies.getJSON("token");
  const history = useHistory();

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);
  return (
    <div className={Style.container}>
      <div className={Style.circle}></div>
      <div className={Style.circle2}></div>
      <div className={Style.circle3}></div>
      <div className={Style.circle4}></div>
      <div className={Style.UserCom}>
        <UserDetail></UserDetail>
      </div>
      <div className={Style.RepoCom}>
        <Repo></Repo>
      </div>
    </div>
  );
};

export default Container;
