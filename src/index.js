import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import HeadBanner from "./HeadBanner";

ReactDOM.render(
  <HeadBanner/>,
  document.getElementById("banner")
);

ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);
