# Props in React

## What are props?

- Props (properties) are the inputs passed to a component from its parent, just like arguments to a function.
- They are passed as attributes in JSX and React bundles them into a **single object**, which the component receives as its first parameter.
- Props are read-only. A component must never modify its own props.

## How to use props

### 1. Pass props from the parent

```jsx
const Body = () => {
  return (
    <div className="res-container">
      <RestaurantCard img="https://example.com/noodles.webp" name="Restaurant 1" description="This is the first restaurant." />
      <RestaurantCard img="https://example.com/pasta.webp" name="Restaurant 2" description="This is the second restaurant." />
    </div>
  );
};
```

### 2. Receive props in the child

```jsx
const RestaurantCard = (props) => {
  return (
    <div className="res-card">
      <img src={props.img} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.description}</p>
    </div>
  );
};
```

`props` here is `{ img: "...", name: "Restaurant 1", description: "This is the first restaurant." }`.

Note: writing `(img, name, description) => ...` does NOT work, because React passes one object, so `img` would be the whole props object and the rest `undefined`.

## Destructuring props

Instead of writing `props.` everywhere, unpack the values directly in the parameter:

```jsx
const RestaurantCard = ({ img, name, description }) => {
  return (
    <div className="res-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};
```

Or destructure inside the function body:

```jsx
const RestaurantCard = (props) => {
  const { img, name, description } = props;
  // use img, name, description directly
};
```

# Inline CSS in JSX

In JSX, `style` does not take a string. It takes a **JavaScript object**, so you need double curly braces: the outer `{}` is JSX expression syntax, the inner `{}` is the object.

- Property names are camelCase (`backgroundColor`, not `background-color`).
- Values are strings (`"#f4c9c9"`, `"10px"`) or numbers (`20` is treated as `20px`).

## Ways to write it

### 1. Inline object directly in the element

```jsx
<div className="res-card" style={{ backgroundColor: "#f4c9c9" }}>
```

### 2. Store the object in a variable

```jsx
const cardStyle = {
  backgroundColor: "#f4c9c9",
  padding: 10,
};

<div className="res-card" style={cardStyle}>
```

### 3. Dynamic values from props or state

```jsx
const RestaurantCard = ({ name, isOpen }) => (
  <div style={{ backgroundColor: isOpen ? "lightgreen" : "lightgray" }}>
    <h3>{name}</h3>
  </div>
);
```

### 4. Merge a shared style with overrides

```jsx
<div style={{ ...cardStyle, border: "1px solid black" }}>
```

## Notes

- Inline styles cannot use pseudo-classes (`:hover`) or media queries. Use a CSS file (`className`) for those.
- Prefer `className` with `index.css` for reusable styles, and inline styles for one-off or dynamic values.

# Config-driven UI

A config-driven UI renders the interface from **data (config)** instead of hard-coding each element. The config usually comes from an API or a JSON file, and the UI changes whenever the config changes, with no code change.

Example: Swiggy shows different banners, offers and restaurants per city or location. The layout code stays the same, and only the data differs.

## Without config (hard-coded, repetitive)

```jsx
<RestaurantCard img="..." name="Restaurant 1" description="This is the first restaurant." />
<RestaurantCard img="..." name="Restaurant 2" description="This is the second restaurant." />
<RestaurantCard img="..." name="Restaurant 3" description="This is the third restaurant." />
```

## With config (data-driven)

```jsx
const resList = [
  { id: 1, img: "...", name: "Restaurant 1", description: "This is the first restaurant." },
  { id: 2, img: "...", name: "Restaurant 2", description: "This is the second restaurant." },
  { id: 3, img: "...", name: "Restaurant 3", description: "This is the third restaurant." },
];

const Body = () => (
  <div className="res-container">
    {resList.map((res) => (
      <RestaurantCard key={res.id} {...res} />
    ))}
  </div>
);
```

## Key points

- `map()` loops over the config and returns one component per item.
- Each item needs a unique `key` prop so React can track it efficiently. Prefer a stable `id` over the array index.
- `{...res}` spreads every field of the object as props (`img`, `name`, `description`).
- Adding, removing or editing a restaurant only means changing the data, not the component.

## Passing a JS object (const data) as props

Say we have one object stored in a `const`:

```jsx
const resData = {
  img: "https://example.com/noodles.webp",
  name: "Restaurant 1",
  description: "This is the first restaurant.",
};
```

### Way 1: pass the whole object as one prop

```jsx
<RestaurantCard resData={resData} />

const RestaurantCard = ({ resData }) => (
  <div className="res-card">
    <img src={resData.img} alt={resData.name} />
    <h3>{resData.name}</h3>
    <p>{resData.description}</p>
  </div>
);
```

### Way 2: spread the object so each field becomes its own prop

```jsx
<RestaurantCard {...resData} />

// same as: <RestaurantCard img={resData.img} name={resData.name} description={resData.description} />

const RestaurantCard = ({ img, name, description }) => (
  <div className="res-card">
    <img src={img} alt={name} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);
```

### Passing an array of objects

```jsx
const resList = [resData, { ...resData, name: "Restaurant 2" }];

{resList.map((res) => (
  <RestaurantCard key={res.name} resData={res} />
))}
```

Use `{resData}` (single braces) because the value is a JS expression. Writing `resData="resData"` would pass the string instead of the object.

## When resData is an array, use map()

```jsx
const resData = [
  { id: 1, img: "...", name: "Restaurant 1", description: "This is the first restaurant." },
  { id: 2, img: "...", name: "Restaurant 2", description: "This is the second restaurant." },
  { id: 3, img: "...", name: "Restaurant 3", description: "This is the third restaurant." },
];

const Body = () => (
  <div className="res-container">
    {resData.map((restaurant) => (
      <RestaurantCard key={restaurant.id} {...restaurant} />
    ))}
  </div>
);

const RestaurantCard = ({ img, name, description }) => (
  <div className="res-card">
    <img src={img} alt={name} />
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);
```

- `map()` runs once per item and returns a new array of `<RestaurantCard />` elements, which React renders.
- `restaurant` is one object from the array on each iteration.
- Pass the object as one prop with `resData={restaurant}`, or spread it with `{...restaurant}`.
- `key` is required on the outermost element returned by `map()`. Use a unique `id`, and avoid the index if the list can reorder.
- Use `resData?.map(...)` if the array may be `undefined` while loading.

### All the ways to write the `RestaurantCard` line inside `map()`

Each `restaurant` is `{ id, img, name, description }`.

**1. Spread the object (`{...restaurant}`)**

```jsx
{resData.map((restaurant) => (
  <RestaurantCard key={restaurant.id} {...restaurant} />
))}
```
Child: `({ img, name, description })`.

**2. Pass each field as its own prop**

```jsx
{resData.map((restaurant) => (
  <RestaurantCard
    key={restaurant.id}
    img={restaurant.img}
    name={restaurant.name}
    description={restaurant.description}
  />
))}
```

**3. Pass the whole object as one prop**

```jsx
{resData.map((restaurant) => (
  <RestaurantCard key={restaurant.id} resData={restaurant} />
))}
```
Child: `({ resData })` and use `resData.name`.

**4. Destructure in the `map()` callback**

```jsx
{resData.map(({ id, img, name, description }) => (
  <RestaurantCard key={id} img={img} name={name} description={description} />
))}
```

**5. Use the index as key (only for static lists that never reorder)**

```jsx
{resData.map((restaurant, index) => (
  <RestaurantCard key={index} {...restaurant} />
))}
```

**6. Explicit `return` with a function body**

```jsx
{resData.map((restaurant) => {
  return <RestaurantCard key={restaurant.id} {...restaurant} />;
})}
```

**7. Build the list in a variable, then render it**

```jsx
const cards = resData.map((restaurant) => (
  <RestaurantCard key={restaurant.id} {...restaurant} />
));

return <div className="res-container">{cards}</div>;
```

**8. Spread plus an override or extra prop**

```jsx
<RestaurantCard key={restaurant.id} {...restaurant} name="Custom name" />
```
Props written after the spread win over the same field inside it.

**9. Plain `for...of` loop (no `map()`)**

```jsx
const cards = [];
for (const restaurant of resData) {
  cards.push(<RestaurantCard key={restaurant.id} {...restaurant} />);
}
```

Notes:
- `key` is used by React only and is not passed to the child as a prop. With spread, `id` is still passed as a prop, which is harmless.
- With an arrow function that has a body `{ }`, you must write `return`. With `( )` the return is implicit.

## Why do we need `key`?

`key` is a special prop that gives each item in a list a stable identity. React uses it during reconciliation (the diffing of the old and new virtual DOM) to match each item to its previous version.

Without a key, React can only compare items by position. If an item is added, removed or reordered, React may:

- re-render and re-create many elements that did not change (slow),
- reuse the wrong DOM node or component state, for example an input's text or a checkbox ends up on the wrong item (bugs).

With a unique key, React knows exactly which item moved, was added or removed, and updates only that one.

```jsx
// List before: [A(id 1), B(id 2), C(id 3)]
// List after:  [Z(id 9), A(id 1), B(id 2), C(id 3)]
// With keys: React inserts only Z and keeps A, B, C as they are.
// Without keys (or index keys): React sees every position changed and updates all of them.
```

Rules:

- Keys must be unique among siblings, not globally.
- Keys must be stable. Do not use `Math.random()`, because a new key each render forces React to re-create every item.
- Prefer a real id from the data (`restaurant.id`). Use the index only for static lists that never reorder, filter or change.
- Put the key on the outermost element returned inside `map()`.
- Without a key, React logs the warning `Each child in a list should have a unique "key" prop`.

## Why not use the index as key?

The index identifies a **position**, not the **item**. When the list changes (insert, delete, reorder, filter, sort), the same index points to a different item, so React matches the wrong old element with the new data.

```jsx
// Before: [A, B, C]  -> keys 0, 1, 2
// Remove A
// After:  [B, C]     -> keys 0, 1
```

React thinks:
- key 0 was A, now it is B, so it "updates" A into B.
- key 1 was B, now it is C, so it "updates" B into C.
- key 2 is gone, so it removes the last element.

What should have happened is: remove A and keep B and C untouched. With a real id (`A=1, B=2, C=3`), React sees key 1 is gone and removes only A.

Problems this causes:

- **Wrong state:** component state (input text, checkbox, open/closed) stays attached to the position, so it shows up on the wrong item after a delete or reorder.
- **Wasted renders:** items that did not change are still updated, because their index-based key now maps to different data.
- **Broken uncontrolled inputs and animations:** the DOM node is reused for a different item.

```jsx
// Bug example: type text in the first input, then delete the first item.
// The text stays in the first input, but it now belongs to the second item.
{items.map((item, index) => (
  <li key={index}>
    {item.name} <input />
  </li>
))}
```

When the index is fine: the list is static, never reordered, filtered or edited, and items have no state or inputs.

So "never" is really "not when the list can change". When the data has no id, generate a stable one once when the data is created (for example with `crypto.randomUUID()`), not during render.

# Optional chaining (`?.`)

Optional chaining safely reads a nested property. If anything before `?.` is `null` or `undefined`, the expression returns `undefined` instead of throwing a `TypeError`.

This is common with API data, where a field may be missing or not loaded yet.

```jsx
const resData = {
  name: "Restaurant 1",
  info: { cuisines: ["Pizza", "Pasta"] },
};

resData.rating.stars;      // TypeError: Cannot read properties of undefined
resData.rating?.stars;     // undefined (no error)
resData.info?.cuisines?.[0]; // "Pizza"  (works with arrays too)
resData.getName?.();       // undefined (works with functions too)
```

## Use in a component

```jsx
const RestaurantCard = ({ resData }) => (
  <div className="res-card">
    <h3>{resData?.name}</h3>
    <p>{resData?.info?.cuisines?.join(", ")}</p>
    <p>{resData?.rating?.stars ?? "No rating"}</p>
  </div>
);
```

## Notes

- Forms: `obj?.prop`, `obj?.[key]`, `fn?.()`.
- It only guards against `null` and `undefined`, not other falsy values like `0` or `""`.
- Pair it with `??` (nullish coalescing) to give a default value.
- Don't overuse it. It can hide real bugs when data is expected to always exist.
