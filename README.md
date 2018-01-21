<h1 align="center">
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-logo.png?raw=true">
</h1>

<br />

<div align="center">
  <a href="https://www.npmjs.com/package/webpack-jarvis">
    <img src="https://img.shields.io/npm/v/webpack-jarvis.svg" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/webpack-jarvis">
    <img src="https://img.shields.io/npm/dm/webpack-jarvis.svg" alt="version" />
  </a>
  <a href="https://oss.ninja/mit/zouhir">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
</div>

## About the Project

J.A.R.V.I.S. (Just A Rather Very Intelligent System) will put in your browser all the relevant information you need from your webpack build whether in dev or in prod.

Tons of features are on the roadmap but still, this beta version will improve the way you look at webpack-dev-server or webpack production build bundle, chunks and other output assets.

It is hugely inspired by other webpack dashboards and the core idea is not original, but here are some features:

**Original Features**:

* Shows you the count of ES Harmony module imports which can be treeshakable and the CJS ones which are not.
* Shows you how well your assets perform in 12 different connection types.

**Other Features**:

* Runs in the browser.
* Beautified errors output.
* Easy way figure out total assets size and individual bundles and chunks.
* It's very beautiful.

**Tech Stack:**

* Preact with Sass pre-processor.
* Socket IO.
* Express Server.

**Screenshot:**

<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/screenshot.png?raw=true" width="100%">
</p>

## Installation

```
$ npm i -D webpack-jarvis
```

In your webpack config file:

```js
const Jarvis = require('webpack-jarvis');

/* the rest of your webpack configs */

plugins: [
    new Jarvis({
      port: 1337 // optional: set a port
    })
]
```

In your browser open:

```
localhost:1337
```

and you are all set!

## Help & Contribute

**Development Options**
- `npm run watch`
- `npm run dev`

Why `watch` and `dev`? `dev` allows you to pull **jarvis** into a differentRepo via npm link and see the differentRepo's data in the **jarvis** UI. Use `watch` when you don't need a differentRepo's data.

`npm run watch`...
- Creates a jarvis *development* build and watches for changes.
- Opens at `localhost:3000`, and is missing fake data.
- Move to `localhost:1337` to see fake data.

`npm run dev`...
First, setup [npm link](https://stackoverflow.com/questions/20888576/how-to-develop-npm-module-locally). Then point to any port *except 1337* in a differentRepo's webpack config...
```javascript
plugins: [
        new Jarvis({ port: 1338 })
    ]
```
...then run `npm run dev` which will...
- Create a jarvis *production* build and watches for changes.
- Is served at `localhost:1337` and includes fake data.
- Once the jarvis build is done, build/serve in a differentRepo.
- When a change occurs in `jarvis`, refresh the browser to see the change.

### On the roadmap:
* Cleanup the hacky code in the client app, it's embarassing, I'm sorry!
* Enforce best practices, structure and higher code quality standards.
* Bundle size analyzer like feature in the table.
* Build snippets page.
* Build Oppurtunities Section to suggest loaders, plugins, etc. that can improve your build and bundle.

**Note:**
> I am not entirely sure how many bugs you will catch while it's in beta, but what I know for sure is the whole app, especially the client Preact app can be dramatically improved, JS & CSS and structure wise as the whole thing has been built in a rush in a very hacky way.

## Contributors

_A super cool design will go here listing all contributors names + GitHub avatar_

## Credits

* [Webpack Dashboard by Formidable Labs](https://github.com/FormidableLabs/webpack-dashboard)

## License

[MIT © Zouhir](https://oss.ninja/mit/zouhir)
