import React from "react";
import Style from "./Card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <div className={Style.card}>
      <div className={Style.detail_con}>
        {" "}
        <Link to={"detail/" + props.data.name}>
          <div className={Style.name}>{props.data.name}</div>
        </Link>
        <div className={Style.createdAt}>
          {"Created At "}
          {props.data.createdAt.substring(0, 10)}
        </div>
        <div className={Style.url}>
          <a href={props.data.url}>GitHub Link</a>{" "}
        </div>
      </div>
    </div>
  );
};

export default Card;
