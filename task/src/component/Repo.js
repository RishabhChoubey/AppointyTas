import React, { useState, useEffect, useCallback } from "react";
import Style from "./Container.module.css";
import Card from "./Card";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import Message from "./Message";

const Repo = () => {
  const [loading, setloading] = useState(true);
  const token = Cookies.getJSON("token");
  const [repo, setrepo] = useState();
  const [pagenum, setpagenum] = useState(5);
  const [paginate, setpaginate] = useState(true);
  const history = useHistory();

  ///////////////////////////////////// LOADING REPOSITORY//////////////////////////////////////////

  const loadmore = useCallback(async () => {
    if (paginate) {
      const {
        data: { data, message },
      } = await Axios.post("/repo", {
        token: token,
        page: pagenum,
      });
      console.log(data, message, "repo");
      if (message) {
        history.push("/");
      }
      if (data && data.viewer.repositories) {
        setrepo(data.viewer.repositories.edges);
        setpaginate(data.viewer.repositories.pageInfo.hasNextPage);
      }

      const curpage = pagenum;
      setpagenum(curpage + 5);
    }
    setloading(false);
  }, [history, token, paginate, pagenum]);

  /////////////////////////////////////USE EFFECT//////////////////////////////////////////

  useEffect(() => {
    if (!token) {
      history.push("/");
    }

    if (loading) loadmore();
  }, [loading, history, token]);

  ///////////////////////////////////// SCROLL //////////////////////////////////////////

  const scroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    console.log(scrollHeight - scrollTop, " ", clientHeight);
    if (Math.floor(scrollHeight - scrollTop) === clientHeight && paginate) {
      setloading(true);
    }
  };

  return (
    <React.Fragment>
      {repo ? (
        repo.length > 0 ? (
          <div className={Style.user_repo} onScroll={scroll}>
            {repo.map((it, i) => {
              return <Card key={i} data={it.node}></Card>;
            })}

            {paginate ? <div style={{ color: "red" }}>loading..</div> : ""}
          </div>
        ) : (
          <Message name={"No Repository"} />
        )
      ) : (
        <Message name={"Loding..."} />
      )}
    </React.Fragment>
  );
};

export default Repo;
