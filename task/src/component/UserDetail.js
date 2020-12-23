import React, { useState, useEffect } from "react";
import Style from "./Container.module.css";
import Message from "./Message";
import Axios from "axios";
import Cookies from "js-cookie";
import { User } from "feather-icons-react";
import { UserIcon, LogoutIcon } from "../icon/Icon";
import { useHistory } from "react-router-dom";

const UsrDetail = () => {
  const [viewer, setviewer] = useState({});
  const token = Cookies.getJSON("token");
  const history = useHistory();

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
    Axios.post("http://localhost:2000/user", {
      token: token,
    }).then((data) => setviewer(data.data.viewer));
  }, []);

  ///////////////////////////////////// LOGOUT //////////////////////////////////////////

  const logout = () => {
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <React.Fragment>
      {viewer && viewer.followers ? (
        <div className={Style.user_detail}>
          <img src={viewer.avatarUrl} className={Style.user_img} />
          <div className={Style.detail_con}>
            <div className={Style.user_name}>{viewer.login}</div>
            <div className={Style.bio}>{viewer.bio}</div>
            <div className={Style.follower}>
              <img src={UserIcon} className={Style.icon} />
              {viewer.followers.totalCount} follower
            </div>
            <div className={Style.following}>
              <img src={UserIcon} className={Style.icon} />{" "}
              {viewer.following.totalCount} following
            </div>
            <div className={Style.logout} onClick={() => logout()}>
              <img src={LogoutIcon} className={Style.icon} /> Logout
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
