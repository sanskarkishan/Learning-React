# What Is a Monolith?

A monolith is an application built as one unified unit. Its features—such as the user interface, business logic, and data access—are developed and deployed together, usually as a single program.

This can make a monolith straightforward to build, test, and deploy, especially for a small application. As it grows, however, changes to one area may require rebuilding or deploying the whole application, and tightly connected parts can become harder to maintain or scale independently.

Monolithic architecture is not inherently bad. It is often a practical starting point; the right architecture depends on the application's size, team, and operational needs.

**Example:** An online store could have its product catalog, shopping cart, payments, and user accounts all inside one application. The application is built and deployed as a single unit.

# What Is Microservice Architecture?

Microservice architecture organizes an application as a group of small, independent services. Each service is responsible for a specific business capability and can usually be developed, deployed, and scaled separately. Services communicate with one another through well-defined interfaces, such as APIs or messages.

This approach lets teams change or scale individual parts without deploying the entire application. It also adds complexity: services must communicate over a network, and teams need to manage deployment, monitoring, failures, and data consistency across them.

Microservices can be useful when an application and its teams need independent development and scaling. For smaller applications, the added operational work may outweigh those benefits.

**Example:** The same online store could have separate catalog, shopping cart, payment, and user-account services. Each service can be deployed independently and communicates with the others through APIs or messages.

# Difference Between Monoliths and Microservices

| Aspect | Monolith | Microservices |
| --- | --- | --- |
| Structure | Features are part of one application. | Features are split into separate services. |
| Deployment | The application is deployed as one unit. | Services can be deployed independently. |
| Scaling | The application is typically scaled as a whole. | Individual services can be scaled as needed. |
| Communication | Components usually communicate within the application. | Services communicate over a network, often through APIs or messages. |
| Complexity | Usually simpler to start and operate. | Requires more work to manage communication, deployments, failures, and data. |
| Often fits | Smaller applications or teams that benefit from a single deployable unit. | Systems that need independently developed, deployed, or scaled parts. |

Neither architecture is always better. A monolith can be a sensible starting point, while microservices can help when independent ownership or scaling becomes important.

# How a Web UI Gets Data from a Backend

A web app's UI usually requests data from a backend through an HTTP API. The UI sends a request to an endpoint, such as `GET /api/restaurants`. The backend handles the request, reads the needed information from its data source, and returns a response, commonly as JSON. The UI stores that response in its state and renders the updated screen.

The flow is:

1. The React UI sends an HTTP request to the backend API.
2. The backend validates the request and retrieves the data.
3. The backend returns a response, usually JSON with an HTTP status code.
4. The UI handles loading or error states, saves successful data in state, and displays it.

## Two Ways to Render While Fetching Data

1. **Wait for the response, then render the data-dependent page.** The app sends the API request and waits for the response before showing that page. This can leave the user looking at a blank or blocked screen while the request is in progress.
2. **Render immediately, then update when data arrives.** The app first renders its UI, often with a loading indicator or placeholder. It requests data at the same time, then updates state when the response arrives. React renders again to show the new data.

The second approach is common in React because it can show useful UI while data is loading. React does not require it in every situation: sometimes a page needs data before it can be shown, and frameworks or routing tools may handle that loading differently. The example below uses the second approach.

For example, a React component can load restaurant data like this:

```jsx
import { useEffect, useState } from "react";

function RestaurantList() {
	const [restaurants, setRestaurants] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function loadRestaurants() {
			try {
				const response = await fetch("/api/restaurants");
				if (!response.ok) {
					throw new Error("Could not load restaurants");
				}
				setRestaurants(await response.json());
			} catch (err) {
				setError(err.message);
			}
		}

		loadRestaurants();
	}, []);

	if (error) return <p>{error}</p>;
	return restaurants.map((restaurant) => (
		<p key={restaurant.id}>{restaurant.name}</p>
	));
}
```

You can think of `fetch()` as a powerful tool JavaScript can use to make HTTP requests. Technically, it comes from the Fetch API provided by the browser, rather than from the JavaScript language itself. It returns a Promise that resolves to a `Response` object; check `response.ok` to detect HTTP errors before reading the response body.

The UI should call the backend API rather than connect directly to the database. The backend protects database credentials and applies the application's rules. If the UI and API run on different origins, the backend may also need to allow the UI's origin through CORS configuration.

In this project's current `Body.jsx`, restaurant data is imported from a local `resdata` file. That is static local data; it is not yet fetched from a backend API.

# What Are React Hooks?

Hooks are JavaScript functions that let function components use React features. For example, `useState` lets a component store and update state, and `useEffect` lets it synchronize with external systems, such as fetching data from an API.

Hook names begin with `use`. You can also create custom Hooks to reuse stateful logic across components. Call Hooks at the top level of a function component or another custom Hook, not inside loops, conditions, or nested functions.

## What Is `useEffect`?

`useEffect` is a Hook that lets a component synchronize with an external system, such as a browser API, a timer, an event listener, or a network request. The component renders first; after React commits that render to the DOM, React runs the effect. On later renders, the effect runs again according to its dependency array. Use it for this kind of external work, not for calculations that can happen directly during rendering.

`useEffect` is commonly written with two arguments: a setup function, often an arrow function, and a dependency array. The dependency array is optional; when provided, it tells React which values to watch to decide when to re-run the effect.

```jsx
useEffect(() => {
	document.title = `Restaurants: ${restaurants.length}`;
}, [restaurants]);
```

The dependency array controls when the effect runs:

- `[restaurants]`: after the initial render and again when `restaurants` changes.
- `[]`: after the initial render.
- No dependency array: after every render.

### Which Runs First?

Given this code:

```jsx
useEffect(() => {
	console.log("Component called");
}, []);

console.log("Body rendered");
```

On the initial render, the console shows:

```text
Body rendered
Component called
```

`Body rendered` is logged while React calls the `Body` component to render it. React runs the `useEffect` callback after that render has been committed to the DOM, so `Component called` appears second. Because the dependency array is empty, this effect does not run again when state changes cause another render. In this app, `App.jsx` does not enable `StrictMode`, so each message is expected once on the initial mount.

An effect can return a cleanup function. React runs cleanup before the effect runs again and when the component is removed, which is useful for removing event listeners or clearing timers.
