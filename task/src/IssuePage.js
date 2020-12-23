import React, { useState, useEffect } from "react";
import Axios from "axios";
import Style from "./IssuePage.module.css";
import Loading from "./Loading";
import Cookies from "js-cookie";

const IssuePage = (props) => {
  const token = Cookies.getJSON("token");
  const id = props.match.params.id;
  const [issue, setissue] = useState();

  useEffect(() => {
    issueLoad();
  }, []);

  const issueLoad = async () => {
    const { data } = await Axios.post("http://localhost:2000/issue", {
      token: token,
      id: id,
    });
    console.log(data.data.viewer);
    if (data.data.viewer.repository) setissue(data.data.viewer.repository);
  };
  console.log(issue, "issue");
  return (
    <div className={Style.container}>
      <div className={Style.circle}></div>
      {issue ? (
        <div className={Style.sub_con}>
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
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default IssuePage;
