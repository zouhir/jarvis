<h1 align="center">
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-logo.png?raw=true">
</h1>

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-about.png?raw=true" width="100%">
</p>

J.A.R.V.I.S. (Just A Rather Very Intelligent System) will put in your browser all the relevant information you need from your webpack build whether in dev or in prod.

It is packed in features even it is still in beta, and a lot of what you see now will hopefully improve the way you look at webpack-dev-server or production build chunks and output.

It is of course hugely inspired by other webpack-dashboard and the core idea is not original, so thank you for Open Sourcers who showed me the road.

**Original Features**:

* Shows you the count of ES Harmony module imports which can be treeshakable.
* shows you how well your assets perform in 12 different connection types.

**Tech Stack:**

* Preact
* Sass
* Socket IO
* Express

**Screenshot:**

<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/screenshot.png?raw=true" width="100%">
</p>

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-install.png?raw=true" width="100%">
</p>

```
$ npm i -D webpack-jarvis
```

In your webpack config file:

```
const Jarvis = require('webpack-jarvis');

// the rest of your webpack configs

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
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-help.png?raw=true" width="100%">
</p>

I am not entirely sure how many bugs you will catch while it's in beta, but what I know for sure is the whole app, especially the client Preact app can be dramatically improved, JS & CSS and structure wise as the whole thing has been built in a rush in a very hacky way.

**On the roadmap:**

* Cleanup the hacky code in the client app
* enforce best practices, structure and higher code quality standards.
* Bundle size analyzer like feature in the table
* Build snippets page
* Build Oppurtunities Section to suggest loaders, plugins, etc. that can improve your build and bundle.

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-contrib.png?raw=true" width="100%">
</p>

_a super cool design will go here listing all contributors names + GitHub avatar_

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-credits.png?raw=true" width="100%">
</p>

* [Webpack Dashboard by Formidable Labs](https://github.com/FormidableLabs/webpack-dashboard)

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-license.png?raw=true" width="100%">
</p>

MIT - [Zouhir](https://zouhir.org)
