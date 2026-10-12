const heading = React.createElement("h1", {}, "Hello World! React from App.js");
// {} => this is the place where we can pass the attributes like className, id, etc. for the element we are creating.
//  In this case, we are not passing any attributes so we are passing an empty object.
console.log(heading); // this return an object which is a React element. It is not a HTML element.
// It is a React element which is a JavaScript object.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading); // this will render the React element in the root div of index.html file.

// this how we use nested React elements. We can create a React element inside another React element.

// Only one will work at a time.

// const parent = React.createElement(
//     // React.createElement is not a HTML element. It is a React element which is a JavaScript object.
//   "div",
//   { id: "parent" },
//   "This is a parent div",
//   React.createElement(
//     "div",
//     { id: "child" },
//     "This is a child div",
//     React.createElement("h1", {}, "This is a child h1 tag")
//   )
// );

// root.render(parent); // this will render the parent React element in the root div of index.html file.
// console.log(parent); // this return an object which is a React element. It is not a HTML element.

// When we have to take sibling elements.

// const parent = React.createElement(
//     // React.createElement is not a HTML element. It is a React element which is a JavaScript object.
//   "div",
//   { id: "parent" },
//   "This is a parent div",
//   React.createElement(
//     "div",
//     { id: "child" },
//     "This is a child div",
//     [
//     React.createElement("h1", {}, "This is a child 1"),
//     React.createElement("h1", {}, "This is a child 2"),
//     React.createElement("h1", {}, "This is a child 3")
//   ]
//   )
// );

// root.render(parent); // this will render the parent React element in the root div of index.html file.
// console.log(parent); // this return an object which is a React element. It is not a HTML element.

const parent = React.createElement(
  // React.createElement is not a HTML element. It is a React element which is a JavaScript object.
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

root.render(parent); // this will render the parent React element in the root div of index.html file.
console.log(parent); // this return an object which is a React element. It is not a HTML element.
