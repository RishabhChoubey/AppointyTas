import React, { useState, useEffect } from "react";
import Style from "./Container.module.css";
import Message from "./Message";
import Axios from "axios";
import Cookies from "js-cookie";

const UsrDetail = () => {
  const [viewer, setviewer] = useState({});
  const token = Cookies.getJSON("token");
  useEffect(() => {
    Axios.post("http://localhost:2000/user", {
      token: token,
    }).then((data) => setviewer(data.data.viewer));
  }, []);

  return (
    <React.Fragment>
      {viewer && viewer.followers ? (
        <div className={Style.user_detail}>
          <img src={viewer.avatarUrl} className={Style.user_img} />
          <div className={Style.detail_con}>
            <div className={Style.user_name}>{viewer.login}</div>
            <div className={Style.bio}>{viewer.bio}</div>
            <div className={Style.follower}>
              {viewer.followers.totalCount} follower
            </div>
            <div className={Style.following}>
              {viewer.following.totalCount} following
            </div>
          </div>
        </div>
      ) : (
        <Message name="Loading..." />
      )}
    </React.Fragment>
  );
};

export default UsrDetail;
