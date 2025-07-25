# Learning Outcomes:
- Figure out routing
- Figure out "load" function
- Figure out the `<something>.server.js` and like the client & server side stuff.
- Figure out page transitions
- Figure out actions


# intro
So svelte, like every other framework needs to handle:
- routing
- loading
- rendering

# Notes:
- Sveltekit apps are server rendered by default

# Routing:

## Dynamic Parameters:
- File based routing, `routes/blog/[slug]/+page.svelte`, the `[slug]` holds the parameter. so, `blog/1`, `blog/2` ... is all captured

# Loading

So, every page in sveltekit can have a corresponding `load` function in a `+page.server.js/ts` file, which lives alongside the `+page.svelte` files. This `+page.server.js` file, as the name suggests, only runs in the server, **even for client-side navigations**. 

### What usually happens ( typical SPA setups):
- U hit a url -> server renders the page (SSR)
- after which the JS takes over -> client handles routing (no more server calls unless you explicitly make em)
- any data fetching after that usually happens in the **browser**, like hitting an API.

### What sveltekit does different
Even after the client router takes over, If you go to a new page that uses `+page.server.js`, Sveltekit will still talk to the server to run that code. It's not running in the browser like `+page.js` would.

---
Okay, loading, so `+page.server.js/ts` exports a `load` function:

```
import { posts } from "../../lib/data/data.js"

export function load() {
    return {
        summaries: posts.map((post) => ({
            slug: post.slug,
            title: post.title,
        })
        )
    }
}
```
the data of which is available in the `+page.svelte` file, from `$props()`:

```
<script lang="ts">
    let { data } = $props();
</script>

<h1>Blog</h1>

<ul>
    <li><a href="/blogs/one">one</a></li>
    <li><a href="/blogs/two">two</a></li>
    <li><a href="/blogs/three">three</a></li>
    {#each data.summaries as { slug, title }}
        <li><a href="/blogs/{slug}">{title}</a></li>
    {/each}
</ul>
```

If, we want to access the dynamic parameter, our `load` funtion, takes a `params`,
```
import { error } from "@sveltejs/kit"
import { posts } from "$lib/data/data"

export function load({ params }) {
    console.error(params.slug); // this depends on your thing so, because we had `/routes/blogs/[slug]`, its `params.slug`, if something else, `params.whateverelse`
    const post = posts.find((post) => post.slug == params.slug)
    console.log(posts, post)

    if (!post) error(404);
    return { post }
}
```
It is important to know that we had `params.slug` here, because our thing was `/routes/blogs/[slug]/`, however, if it were `/routes/blogs/[idk]/`, it would've been `params.idk`

### Layout data?
So, just like `+layout.svelte` creates template for every child, `+layout.server.js` file loads data for every child. So, say u have

```
// routes/blogs/+layout.server.js
import { posts } from "$lib/data"

export function load() {
    return {
        summaries: posts.map(p => ({
            slug: p.slug,
            title: p.title
        }))
    };
}
```
Now, all child pages under `/blogs` get access to the `data.summaries` without needing to re-fetch it every time. Furthermore, say you have **both** a layout `load()` and a page `load()`. In this case, sveltekit **merges it**.  For instance, along with the above `layout.server.js`, in the parent, you also had the following

```
// /routes/blogs/[slug]/+page.server.js
export function load({ params }) {
    const post = posts.find(p => p.slug === params.slug);
    if (!post) throw error(404);
    return { post };
}
```
So, in this case, our final `+page.svelte` page in `/routes/blogs/[slug]/+page.svelte` will have a `data` object that looks like:
```json
{
  summaries: [...], // from parent layout.server.js
  post: {...}       // from page.server.js
}
```

---
### Setting Headers
So, inside our `load()` function, we also have access to a `setHeaders` function. 
```
export function load({ setHeaders }) {
    setHeaders({
        'Content-Type': 'text/plain'
    });
}
```
However, our `setHeaders` function, can't be used with the `Set-Cookies` header. Instead, you should use the `cookies` API. In our load function, 

#### Get Cookies
```
export function load({ cookies }) {
	const visited = cookies.get('visited');

	return {
		visited: visited === 'true'
};
```
#### Set Cookies:
```
export function load({ cookies }) {
	const visited = cookies.get('visited');

	cookies.set('visited', 'true', { path: '/' });

	return {
		visited: visited === 'true'
	};
}
```

---

## Hooks / Middleware type shit

So, hooks live in `src/hooks.server.js`, and they basically are a way for you to well, basically they are middlewares type shit. The most elementary hook is the `handle`. It receives an `event` object, along with a `resolve` function, and returns a `Response`

The default `handle`  function looks like

```
export async function handle ({event,resolve}) {
    return await resolve(event)
}
```
This hook, will run for every request, so say you did 
```
export async function handle({ event, resolve }) {
    return new Response('deeeez nuts')
}
```
Now, every page is just `deeeez nuts`

##### Middleware esq RequestEvent object
So, basically the `event` object passed into the function is the **same object** that gets passed into **API routes** & form actions & `load` functions, so this means, we can add some data to `event.locals`

``` 
// src/hooks.server.js

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.answer = 69;
    return resolve(event);
};
```


``` 
// routes/+page.server.js
export function load(event) {
    return {
        message: event.locals.answer
    }
}
```

```
// +page.svete
<script>
    let { data } = $props();
</script>

<h1>Home Page {data.message}</h1>
```
That gets us, home page 69 lol.

#### `event.fetch`
So, okay turns out in server-side code like in node, if you call `fetch('something')`, it fails unless you provide a full url. But sveltekit's `fetch` is goated:

##### What makes `event.fetch` so special?
So apparantly, it
- keeps cookies & auth: so if a user is logged in, and you use `event.fetch`, it'll include their session cookies automatically.
- incoming requests are optimized: If you fetch a route like `/api/stuff`, that's handled by your own sveltekit code, it won't make a real HTTP request, instead it just calls your handler directly. 
- Allows relative urls

Pretty simple just:
```

import type { Handle } from '@sveltejs/kit';

export async function handleFetch({ event, request, fetch }) {
	console.log('FETCHED:', request.url); // logs every fetch made with event.fetch
	return await fetch(request);
}

Or example of redirects fetch:

export async function handleFetch({ event, request, fetch }) {
	const url = new URL(request.url);

	if (url.pathname === '/api/data') {
		// internally reroute
		return fetch('/api/other');
	}

	return fetch(request);
}
```

```
// + page.server.js
export const load = async ({ fetch }) => {
	const res = await fetch('/api/data'); // this hits your modified handleFetch
	const json = await res.json();

	return { stuff: json };
};
```

#### HandleErrors
Just like handleFetch, but this triggeres on errors.

```
export function handleError({ event, error }) {
	console.error(error.stack);
}
```

---

# Page Options
Basically config flags you can export from `+page.js` or `+layout.js` etc

```
export const ssr = true;         // enable/disable server-side rendering
export const csr = true;         // enable/disable client-side rendering
export const prerender = true;   // static site generation
export const trailingSlash = 'ignore' | 'always' | 'never';
```

Where do you export them from?

- `+page.js` or +page.server.js → affects just that page
- `+layout.js` or +layout.server.js → affects everything inside that layout
- `src/routes/+layout.js` (root layout) → sets default for the whole app

Child files override parent ones.

