import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", { id: "heading" }, "Namaste React");
// =const jsxHeading = <h1>React  using JSX</h1>

// const jsxHeading = <h1 id="jsxHeading">React using JSX</h1>
const jsxHeading = <h1 id="jsxHeading">React using JSX</h1>;

// React Component
// React functional component

const num = 2500;
const HeadingComponent = () => {
  return (
    <div>
      {jsxHeading}  {/* React Element */}
      <TitleComponent />  {/* component composition */}
      <h1 id="heading">Namaste React Functional Component</h1>
      <p>{num}</p>
    </div>
  );
};

const TitleComponent = () => {
  return <h1 id="title">Namaste React Title Component</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);
// root.render(jsxHeading); // React Element
root.render(<HeadingComponent />); // React Component
