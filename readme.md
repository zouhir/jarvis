<h1 align="center">
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-logo.png?raw=true">
</h1>

</br>

[![npm package](https://img.shields.io/npm/v/webpack-jarvis.svg)](https://www.npmjs.com/package/webpack-jarvis)
[![npm package](https://img.shields.io/npm/dm/webpack-jarvis.svg)](https://www.npmjs.com/package/webpack-jarvis)

</br>
</br>

<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-about.png?raw=true" width="100%">
</p>

J.A.R.V.I.S. (Just A Rather Very Intelligent System) will put in your browser all the relevant information you need from your webpack build whether in dev or in prod.

Tons of features are on the roadmap but still, this beta version will improve the way you look at webpack-dev-server or webpack production build bundle, chunks and other output assets.

It is hugely inspired by other webpack dashboards and the core idea is not original, but here are some features:

**Original Features**:

* Shows you the count of ES Harmony module imports which can be treeshakable and the CJS ones which are not.
* shows you how well your assets perform in 12 different connection types.

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

<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-install.png?raw=true" width="100%">
</p>

```
$ npm i -D webpack-jarvis
```

In your webpack config file:

```javascript
const Jarvis = require('webpack-jarvis');

/* the rest of your webpack configs */

plugins: [
    new Jarvis() // that's all you need!
]
```

In your browser open:

```
localhost:1337
```

and you are all set!

<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-help.png?raw=true" width="100%">
</p>

**On the roadmap:**

* Cleanup the hacky code in the client app, it's embarassing I am sorry!.
* enforce best practices, structure and higher code quality standards.
* Bundle size analyzer like feature in the table.
* Build snippets page.
* Build Oppurtunities Section to suggest loaders, plugins, etc. that can improve your build and bundle.

**Note:**
> I am not entirely sure how many bugs you will catch while it's in beta, but what I know for sure is the whole app, especially the client Preact app can be dramatically improved, JS & CSS and structure wise as the whole thing has been built in a rush in a very hacky way.

<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-contrib.png?raw=true" width="100%">
</p>

_a super cool design will go here listing all contributors names + GitHub avatar_

<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-credits.png?raw=true" width="100%">
</p>

* [Webpack Dashboard by Formidable Labs](https://github.com/FormidableLabs/webpack-dashboard)

<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-license.png?raw=true" width="100%">
</p>

MIT © [Zouhir](https://zouhir.org)
