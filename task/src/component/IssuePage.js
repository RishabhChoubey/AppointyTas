import React, { useState, useEffect } from "react";
import Axios from "axios";
import Style from "./IssuePage.module.css";
import Message from "./Message";
import Cookies from "js-cookie";

const IssuePage = (props) => {
  const token = Cookies.getJSON("token");
  const id = props.match.params.id;
  const [issue, setissue] = useState();

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    issueLoad();
  }, []);

  ///////////////////////////////////// ISSUE LAODING//////////////////////////////////////////

  const issueLoad = async () => {
    const { data } = await Axios.post("/issue", {
      token: token,
      id: id,
    });

    if (data.data.viewer.repository) setissue(data.data.viewer.repository);
  };

  return (
    <div className={Style.container}>
      <div className={Style.circle}></div>
      <div className={Style.circle2}></div>
      <div className={Style.circle3}></div>
      <div className={Style.circle4}></div>
      <div className={Style.sub_con}>
        {issue ? (
          issue.issues.nodes.length > 0 ? (
            <React.Fragment>
              {issue.issues.nodes.map((it, i) => {
                return (
                  <div className={Style.card} key={i}>
                    <div className={Style.title}>
                      {"Title : "}
                      {it.title}
                    </div>
                    <div className={Style.body}>
                      {"Body : "}
                      {it.body}
                    </div>
                    <div className={Style.createdAt}>
                      {"Created : "}
                      {it.createdAt.substring(0, 10)}
                    </div>
                    <div className={Style.login}>
                      {"By : "}
                      {it.author.login}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <Message name="No Issues Registered" />
          )
        ) : (
          <Message name="Loading..." />
        )}
      </div>
    </div>
  );
};

export default IssuePage;
