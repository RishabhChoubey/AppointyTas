(this.webpackJsonptask=this.webpackJsonptask||[]).push([[0],{31:function(e,t,c){e.exports={card:"Card_card__2I55n"}},38:function(e,t,c){},39:function(e,t,c){},63:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c(0),o=c.n(a),s=c(29),r=c.n(s),i=(c(38),c(39),c(9)),l=c.n(i),d=c(15),j=c(2),u=c(30),b=c.n(u),h=c(12),O=c.n(h),f=function(e){var t=b.a.parse(e.location.search).code;return console.log("code",t),Object(a.useEffect)((function(){t&&l.a.post("http://localhost:2000/auth",{client_id:"893aad47e9596025d42c",client_secret:"16ac8e8a8c7722bc22d9a3580abfccc1ec257074",code:t},{headers:{"Access-Control-Allow-Origin":"*"}}).then((function(t){console.log(t.data,"login"),O.a.set("token",JSON.stringify(t.data)),e.history.push("code")}))}),[t]),Object(n.jsx)("a",{href:"https://github.com/login/oauth/authorize?client_id=893aad47e9596025d42c&client_secret=16ac8e8a8c7722bc22d9a3580abfccc1ec257074&scope=repo,user,email",children:"login"})},g=c(8),p=c.n(g),x=c(11),_=c(31),m=c.n(_),v=function(e){return Object(n.jsxs)("div",{className:m.a.card,children:[Object(n.jsx)("div",{children:e.data.name}),Object(n.jsxs)("div",{children:[e.data.createdAt.substring(0,10),"created"]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("a",{href:e.data.url,children:"GitHub Link"})," "]})]})},N=(c(58),function(){var e=Object(a.useState)(!0),t=Object(x.a)(e,2),c=t[0],s=t[1],r=O.a.getJSON("token"),i=Object(a.useState)(),d=Object(x.a)(i,2),j=d[0],u=d[1],b=Object(a.useState)(5),h=Object(x.a)(b,2),f=h[0],g=h[1],_=Object(a.useState)(!0),m=Object(x.a)(_,2),N=m[0],w=m[1];Object(a.useEffect)((function(){c&&setTimeout(S(),1e4)}),[c]);var S=function(){(console.log(f,N),N)&&(l.a.post("http://localhost:2000/repo",{token:r,page:f}).then((function(e){u(e.data.viewer.repositories.edges),w(e.data.viewer.repositories.pageInfo.hasNextPage)})),g(f+5));s(!1)};return Object(n.jsx)(o.a.Fragment,{children:j?Object(n.jsxs)("div",{className:p.a.user_repo,onScroll:function(e){var t=e.currentTarget,c=t.scrollTop,n=t.clientHeight,a=t.scrollHeight;console.log(a-c," ",n),Math.floor(a-c)===n&&N&&s(!0)},children:[j.map((function(e){return Object(n.jsx)(v,{data:e.node},e.node.name)})),N?Object(n.jsx)("div",{style:{color:"red"},children:"loading.."}):""]}):"loading"})}),w=function(){var e=Object(a.useState)({}),t=Object(x.a)(e,2),c=t[0],s=t[1],r=O.a.getJSON("token");return Object(a.useEffect)((function(){l.a.post("http://localhost:2000/user",{token:r}).then((function(e){return s(e.data.viewer)}))}),[]),Object(n.jsx)(o.a.Fragment,{children:c.followers?Object(n.jsxs)("div",{className:p.a.user_detail,children:[Object(n.jsx)("img",{src:c.avatarUrl,className:p.a.user_img}),Object(n.jsx)("div",{className:p.a.user_name,children:c.login}),Object(n.jsx)("div",{className:p.a.bio,children:c.bio}),Object(n.jsxs)("div",{className:p.a.follower,children:[c.followers.totalCount," follower"]}),Object(n.jsxs)("div",{className:p.a.following,children:[c.following.totalCount," following"]})]}):"loading"})},S=function(e){return Object(n.jsxs)("div",{className:p.a.container,children:[Object(n.jsx)(w,{}),Object(n.jsx)(N,{})]})},C=function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)(j.a,{exact:!0,path:"/",component:f}),Object(n.jsx)(j.a,{exact:!0,path:"/code",component:S})]})};var k=function(e){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(d.a,{children:Object(n.jsx)(C,{})})})},F=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,64)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,o=t.getLCP,s=t.getTTFB;c(e),n(e),a(e),o(e),s(e)}))};r.a.render(Object(n.jsx)(o.a.StrictMode,{children:Object(n.jsx)(k,{})}),document.getElementById("root")),F()},8:function(e,t,c){e.exports={container:"Code_container__2A8iF",user_detail:"Code_user_detail__J-KQl",user_repo:"Code_user_repo__2vSbA",user_img:"Code_user_img__4Q4Jh"}}},[[63,1,2]]]);
//# sourceMappingURL=main.43938bd6.chunk.js.map