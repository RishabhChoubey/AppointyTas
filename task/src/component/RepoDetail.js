import React, { useState, useEffect, useCallback } from "react";
import Style from "./RepoDetail.module.css";
import Axios from "axios";
import Cookies, { set } from "js-cookie";
import Message from "./Message";
import { Link } from "react-router-dom";
import { EditIcon, UpdateIcon, CancelIcon } from "../icon/Icon";

const RepoDetail = (props) => {
  const [repo, setrepo] = useState();
  const [edit, setedit] = useState(false);
  const [name, setname] = useState("");
  const [des, setdes] = useState("");
  const token = Cookies.getJSON("token");
  let id = props.match.params.id;
  console.log(id);

  if (name != "") {
    id = name;
  }

  ////////////////////////////////////////USE EFFECT//////////////////////////
  useEffect(() => {
    detail();
    console.log(edit);
  }, [edit]);

  ////////////////////////////////////////EDIT TO OPEN EDIT SECTION//////////////////////////
  const editData = () => {
    if (edit) {
      setname(repo.name);
      setdes(repo.description);
    }
    setedit((e) => !edit);
  };

  ////////////////////////////////////////REPOSITORY FETCH METHOD//////////////////////////

  const detail = async () => {
    const { data } = await Axios.post("/repoDetail", {
      token: token,
      id: id,
    });
    console.log(data, "detail data");
    if (data.viewer.repository) {
      setrepo(data.viewer.repository);
      setname(data.viewer.repository.name);
      setdes(data.viewer.repository.description);
    }
  };
  console.log(repo);

  ////////////////////////////////////////EDIT FORM//////////////////////////
  const updateForm = () => {
    return (
      <form onSubmit={submitHandler} className={Style.form}>
        <label className={Style.label}>Name</label>{" "}
        <input
          value={name}
          onChange={(e) => changeName(e)}
          className={Style.input}
        />
        <label className={Style.label}>Description</label>{" "}
        <textarea
          value={des}
          onChange={(e) => changeDes(e)}
          className={Style.area}
        />
        <button type="submit" className={Style.button}>
          Update
        </button>
      </form>
    );
  };

  //////////////////////////////////////// SUBMIT HANDLER //////////////////////////

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");

    const { data } = await Axios.post("/update", {
      token: token,
      name: name,
      des: des,
      id: repo.id,
    });
    console.log(data, "submit");

    if (!data.errors) {
      setedit(false);
      console.log("after submit", name);
      //  props.history.push("/detail/" + name);
    }
  };

  ////////////////////////////////////////HANDLING VALUE CHANGE//////////////////////////

  const changeName = useCallback((e) => setname(e.target.value), []);
  const changeDes = useCallback((e) => setdes(e.target.value), []);

  return (
    <div className={Style.up_con}>
      <div className={Style.circle}></div>
      <div className={Style.circle2}></div>
      <div className={Style.circle3}></div>
      <div className={Style.circle4}></div>
      {repo ? (
        <div className={Style.container}>
          <div className={Style.name}>{repo.name}</div>
          {repo.description && (
            <div className={Style.des}>
              {"Description : "}
              {repo.description}
            </div>
          )}
          <div className={Style.createdAt}>
            {"Created At "}
            {repo.createdAt.substring(0, 10)}
          </div>
          <div className={Style.updatedAt}>
            {" Updated At "}
            {repo.updatedAt.substring(0, 10)}
          </div>
          <div className={Style.url}>
            <a href={repo.url}>Github Link</a>
          </div>
          <div className={Style.collb}>collabarators</div>
          <div>
            {" "}
            {repo.collaborators.edges.length > 0 &&
              repo.collaborators.edges.map((it, i) => {
                return (
                  <div className={Style.li_con} key={i}>
                    {" "}
                    <li className={Style.collb_name}>{it.node.login}</li>
                  </div>
                );
              })}
          </div>
          <button onClick={() => editData()} className={Style.button}>
            {edit ? "cancel" : "edit"}
          </button>
          {edit && updateForm()}
          <div className={Style.issue}>
            <Link to={"/issue/" + repo.name}>Issues Pages</Link>
          </div>
        </div>
      ) : (
        <Message name="Loading..." />
      )}
    </div>
  );
};

export default RepoDetail;
