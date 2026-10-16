## JavaScript and JSX

**JavaScript (JS)** is the programming language used to write application logic. **JSX** is a syntax extension commonly used with React that lets you write markup-like elements inside JavaScript.

```js
// JavaScript
const greeting = "Hello!";
```

```jsx
// JSX
const heading = <h1>Hello!</h1>;
```

JSX is not HTML, and browsers do not understand JSX directly. A build tool such as Parcel transforms it into JavaScript that React can use. A `.jsx` extension signals that a file contains JSX, though projects can also allow JSX in `.js` files.

When importing a component, you can usually omit the file extension or include it:

```js
import Header from "./components/Header";
import Header from "./components/Header.jsx";
```

Both resolve to `Header.jsx` in a bundler such as Parcel. Use one import at a time, not both; the extensionless form works when the bundler can resolve the `.jsx` extension automatically.

## JavaScript exports

Exports let one file share values, functions, or components with another file. The two common forms are **default exports** and **named exports**.

### Default export

Use a default export when a file has one main value to share, such as a React component. A file can have only one default export, and the importer can choose its local name.

```jsx
// Header.jsx
const Header = () => <header>My App</header>;

export default Header;
```

```jsx
// App.jsx
import Header from "./Header";
// The imported name can differ from the original:
// import SiteHeader from "./Header";
```

### Named exports

Use named exports when a file shares multiple values, or when you want imports to use the exported names explicitly. Put `export` before each declaration, or export several declarations together.

```js
// utils.js
export const appName = "My App";
export const add = (first, second) => first + second;
```

```js
// another file
import { appName, add } from "./utils";
```

Named imports must match the exported names. Use `as` to rename one locally:

```js
import { appName as title } from "./utils";
```

### Using both in one file

A file can have one default export and any number of named exports. Import them like this:

```js
// config.js
export const appName = "My App";
const config = { theme: "light" };
export default config;
```

```js
// another file
import config, { appName } from "./config";
```

You can also export the **same value** as both the named and default export:

```js
// appName.js
export const appName = "My App";
export default appName;
```

```js
// another file
import defaultAppName, { appName } from "./appName";
```

Here, `appName` is the named import, while `defaultAppName` is a local name chosen for the default import. Both contain `"My App"`.

This does **not** work:

```js
import appName, { appName } from "./appName";
```

It declares the local name `appName` twice, causing a duplicate identifier error. Give one import a different local name, as in the working example above.

## Hooks

Hooks are React functions that let function components use React features such as state. Call Hooks at the top level of a function component, not inside loops, conditions, or nested functions.

### `useState`

`useState` adds state to a function component. It returns two values: the current state and a setter function. Calling the setter updates the state and tells React to render the component again with the new value.

In `Body`, `res` is the list currently shown, initialized with `resData`. Clicking the button filters the original list and stores the result in state:

```jsx
import { useState } from "react";
import resData from "../utils/resdata";

const Body = () => {
	const [res, setRes] = useState(resData);

	return (
		<>
			<button
				onClick={() => {
					setRes(resData.filter((restaurant) => restaurant.rating >= 4.5));
				}}
			>
				Top Rated Restaurants
			</button>

			{res.map((restaurant) => (
				<p key={restaurant.id}>
					{restaurant.name} - {restaurant.rating}
				</p>
			))}
		</>
	);
};
```

`useState` returns an array containing the current state and its setter. Array destructuring is the common shorthand for accessing these two values by index:

```js
const arr = useState(list);
const res = arr[0];
const setRes = arr[1];
```

This is equivalent to:

```js
const [res, setRes] = useState(list);
```

- `[res, setRes]` uses array destructuring: `res` is the current value, and `setRes` updates it.
- `useState(resData)` uses `resData` as the initial state. This initial value is used when the component first renders.
- `filter()` returns a new array containing restaurants rated `4.5` or higher. Passing that array to `setRes` updates the displayed list.
- Do not assign directly to state or mutate the imported `resData`; use the setter with a new value instead.
- When `setRes` updates `res`, React re-renders `Body` so the UI reflects the new state.
- During rendering, React compares the new UI with the previous one and applies the necessary changes to the DOM instead of rebuilding the whole page. This efficient update process helps React keep interfaces responsive.

## Virtual DOM

The **virtual DOM** is a common name for React's in-memory representation of the UI structure that corresponds to the real DOM. It is made from React elements, which are JavaScript objects describing things such as element types, props, and children. It is not the browser's actual DOM, and it is not displayed directly.

JSX is transformed into JavaScript that creates these React elements. When state changes, React renders a new description, compares it with the previous one through reconciliation, and commits the necessary changes to the real DOM.

For example:

```jsx
const Counter = ({ count }) => <p>Count: {count}</p>;
```

If `count` changes from `2` to `3`, the old and new descriptions are conceptually:

```text
Old: <p>Count: 2</p>
New: <p>Count: 3</p>
```

Because the element type is still `<p>`, React can keep the existing paragraph and update its text, rather than rebuilding the entire page.

## Reconciliation

**Reconciliation** is the process React uses to decide what needs to change after a component renders again. React creates a new description of the UI, compares it with the previous description, then commits the necessary changes to the browser DOM. A component re-render does not mean React replaces the entire page.

### Diffing algorithm

The **diffing algorithm** is the comparison step in reconciliation. It compares the previous UI description with the new one to identify what changed:

```text
Old: <p>Count: 2</p>
New: <p>Count: 3</p>
```

Since the element type is still `<p>`, React can keep the existing paragraph and update its text. For lists, keys help React match items between the old and new descriptions so it can identify which items were added, removed, or moved.

### How React matches elements

- If an element has the same type in the same position, React usually reuses it and updates changed props or content. For a component, React also preserves its state when it can match that component across renders.
- If the element type changes, such as from `<section>` to `<article>`, React replaces that element and its descendants. State inside the replaced component subtree is reset.
- For arrays of children, React uses `key` values to match items across renders. Keys should be unique among siblings and stable between renders.

For example, if a new restaurant is inserted at the start of a list, stable IDs let React recognize the existing restaurants and match them to their previous elements:

```jsx
{res.map((restaurant) => (
	<RestaurantCard key={restaurant.id} {...restaurant} />
))}
```

Avoid using the array index as a key when items can be inserted, removed, or reordered. An index identifies a position, not the restaurant, so React may associate an item's previous component state with a different restaurant. Use a stable ID from the data instead.

Reconciliation helps React update the DOM efficiently, but it does not guarantee every React render is fast. Keep rendering work reasonable, and use stable keys for dynamic lists.
