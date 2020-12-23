import React, { useState, useEffect } from "react";
import Style from "./Message.module.css";
const Message = (props) => {
  return <div className={Style.load}>{props.name}</div>;
};

export default Message;
