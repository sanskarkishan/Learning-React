import React from "react";
import ReactDOM from "react-dom/client";


const parent = React.createElement(
  "div",
  { id: "parent" },
  "This is a parent div",
  [
    React.createElement("div", { id: "child1" }, [
      React.createElement("h1", {}, "This is a child 1"),
      React.createElement("h2", {}, "This is a child 2"),
      React.createElement("h2", {}, "This is a child 3"),
    ]),
    React.createElement("div", { id: "child2" }, [
      React.createElement("h1", {}, "This is a child 1"),
      React.createElement("h2", {}, "This is a child 2"),
      React.createElement("h2", {}, "This is a child 3"),
    ]),
  ]
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);