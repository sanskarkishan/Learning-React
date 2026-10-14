# 03 – Laying the Foundation

Notes on npm scripts, JSX, and React components from Namaste React.

## Running the project

Add scripts to `package.json` to shorten the run commands:

```json
"scripts": {
  "start": "parcel index.html",
  "build": "parcel build index.html"
}
```

| Mode | Without script | With script |
| ---- | -------------- | ----------- |
| Development | `npx parcel index.html` | `npm start` or `npm run start` |
| Production | `npx parcel build index.html` | `npm run build` |

> `npm build` on its own is not valid. Use `npm run build`.

## JSX

JSX is a syntax that makes it easier to create React elements.

```jsx
const jsxHeading = <h1 id="jsxHeading">React using JSX</h1>;
```

- JSX is **not** part of React. React works without it, but JSX makes development easier.
- JSX is HTML-like syntax, not HTML inside JS.

- JSX is not pure JavaScript. The JS engine only understands ECMAScript, so browsers cannot run JSX directly.

### How JSX gets to the browser

Parcel passes the code to **Babel** (a package managed by Parcel), which transpiles it before it reaches the JS engine.

```text
JSX  →  React.createElement  →  ReactElement (JS object)  →  HTMLElement (rendered)
```

### Curly braces `{}`

- Any JavaScript expression can be written inside `{}`.
- JSX escapes the value, so malicious data inside `{}` is not executed as code.

```jsx
const num = 2400;
<p>{num}</p>
```

## React components

There are two types:

1. **Class-based components**: the old way.
2. **Functional components**: the new way. A normal JS function that returns JSX, with a name that starts with a capital letter.

```jsx
const TitleComponent = () => {
  return <h1 id="title">Namaste React Title Component</h1>;
};

const HeadingComponent = () => (
  <div>
    <TitleComponent />
    <h1 id="heading">Namaste React Functional Component</h1>
  </div>
);
```

### Component composition

Using one component inside another. These two forms are equivalent:

```jsx
<Title />
<Title></Title>
```

### Rendering

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
```

Comments inside JSX must be written as `{/* comment */}`.