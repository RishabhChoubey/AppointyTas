import React, { useState, useEffect, Fragment } from "react";

import Style from "./Container.module.css";
import Repo from "./Repo";
import UserDetail from "./UserDetail";

const Container = (props) => {
  return (
    <div className={Style.container}>
      <div className={Style.circle}></div>
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
