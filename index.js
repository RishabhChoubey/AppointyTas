const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { json } = require("body-parser");

// const fs = require("fs");
// var compression = require("compression");
// let memCache = new cache.Cache();

const app = express();
///////////////middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(compression());

// let cacheMiddleware = (duration) => {
//   return (req, res, next) => {
//     let key = "__express__" + req.originalUrl || req.url;
//     let cacheContent = memCache.get(key);
//     if (cacheContent) {
//       res.send(cacheContent);
//       return;
//     } else {
//       res.sendResponse = res.send;
//       res.send = (body) => {
//         memCache.put(key, body, duration * 1000);
//         res.sendResponse(body);
//       };
//       next();
//     }
//   };
// };

// }
// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
// app.use("/api/uploads", upload);

// if (process.env.NODE_ENV === "production") {
//   console.log("production");
//   app.use(express.static("bloggy/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "bloggy/build/index.html"));
//   });
// }

app.post("/auth", (req, res) => {
  console.log("enter");

  const { client_id, client_secret, code } = req.body;

  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);

  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: data,
  })
    .then((res) => res.text())
    .then((reqString) => {
      const param = new URLSearchParams(reqString);
      console.log(param);

      const access_token = param.get("access_token");
      const scope = param.get("scope");
      const token_type = param.get("token_type");

      //   return res.send(reqString);

      return res.send(access_token);
    });
  console.log("enter1");
});

app.post("/user", (req, res) => {
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: `

{
  viewer {
    login
    email
    createdAt
    bio
    avatarUrl
    followers {
      totalCount
    }
    following {
      totalCount
    }
    
  }
}



      `,
    }),
    headers: {
      Authorization: "token " + req.body.token,
      "Content-Type": "applicaation/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.json(data.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/repo", (req, res) => {
  console.log(req.body.page);
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: `
{
  viewer {
    repositories(first: ${req.body.page}, orderBy: {field: CREATED_AT, direction: DESC}) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          createdAt
          name
          url
        }
      }
    }
  }
}



      `,
    }),
    headers: {
      Authorization: "token " + req.body.token,
      "Content-Type": "applicaation/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/repoDetail", (req, res) => {
  console.log(req.body.id);
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: ` 
{
  viewer {
    repository(name: "${req.body.id}") {
      id
      createdAt
      name
      pushedAt
      url
      updatedAt
      description
      collaborators(first: 10) {
        edges {
          node {
            id
            login
            name
          }
        }
      }
    }
  }
}


      `,
    }),
    headers: {
      Authorization: "token " + req.body.token,
      "Content-Type": "applicaation/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.json(data.data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/update", (req, res) => {
  console.log(req.body.id);
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: ` 
mutation {
  updateRepository(input: {repositoryId: "${req.body.id}" , description: "${req.body.des}", name: "${req.body.name}"})
 {
    clientMutationId
  }
}



      `,
    }),
    headers: {
      Authorization: "token " + req.body.token,
      "Content-Type": "applicaation/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

app.post("/issue", (req, res) => {
  console.log(req.body.id);
  fetch(`https://api.github.com/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: ` 

{
  viewer {
    repository(name: "${req.body.id}") {
      name
      issues(first: 10) {
        nodes {
          id
          title
          body
          createdAt
          author {
            login
          }
        
          
        }
      }
    }
  }
}


      `,
    }),
    headers: {
      Authorization: "token " + req.body.token,
      "Content-Type": "applicaation/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return res.json(data);
    })
    .catch((error) => {
      return res.json(error);
    });
});

if (process.env.NODE_ENV === "production") {
  console.log("production");
  app.use(express.static("task/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "task/build/index.html"));
  });
}

app.listen(process.env.PORT || 2000, () => {
  console.log("listenning  ", process.env.PORT || 2000);
});
