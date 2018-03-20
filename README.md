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
* Google or Stackoverflow Search for programming errors in 1 button click.

**Other Features**:

* Runs in the browser.
* Beautified errors output.
* Easy way figure out total assets size and individual bundles and chunks.
* It's very beautiful.

**Tech Stack:**

* Preact with Sass pre-processor.
* Socket IO.
* [Polka](https://github.com/lukeed/polka) Server.

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
const Jarvis = require("webpack-jarvis");

/* the rest of your webpack configs */

plugins: [
  new Jarvis({
    port: 1337 // optional: set a port
  })
];
```

In your browser open:

```
localhost:1337
```

and you are all set!

## Options

Options are (optionally) passed in to the constructor

```javascript
new Jarvis(options);
```

### `options.port`

Type: `Number`<br>
Default: `1337`

The Jarvis dashboard will open on a localhost server at this port.

### `options.host`

Type: `String`<br>
Default: `localhost`

The Jarvis dashboard will attach to this host, e.g. `0.0.0.0`.

## `options.watchOnly`

Type: `Boolean`<br>
Default: `true`

If set to false, then Jarvis will also run for non-watch builds, and keep running after the build completes.

## `options.packageJsonPath`

Type: `String`<br>
Default: `process.cwd()`

Jarvis will look inside this directory for your package.json.

## Help & Contribute

Setting up the dev environment

Install Dependencies:

```
$ npm install
```

Run Jarvis in your browser, Jarvis root:

```
$ npm run watch
```

Finally, open a browser to `http://localhost:1337`!

**On the roadmap:**

* Cleanup the hacky code in the client app, it's embarassing, I'm sorry!
* Enforce best practices, structure and higher code quality standards.
* Bundle size analyzer like feature in the table.
* Build snippets page.
* Build Oppurtunities Section to suggest loaders, plugins, etc. that can improve your build and bundle.

**Note:**

> I am not entirely sure how many bugs you will catch while it's in beta, but what I know for sure is the whole app, especially the client Preact app can be dramatically improved, JS & CSS and structure wise as the whole thing has been built in a rush in a very hacky way.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/5052316?v=4" width="100px;"/><br /><sub><b>Zouhir ⚡️</b></sub>](https://zouhir.org)<br />[💻](https://github.com/zouhir/jarvis/commits?author=zouhir "Code") [🤔](#ideas-zouhir "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/5855893?v=4" width="100px;"/><br /><sub><b>Luke Edwards</b></sub>](https://lukeed.com)<br />[💻](https://github.com/zouhir/jarvis/commits?author=lukeed "Code") | [<img src="https://avatars1.githubusercontent.com/u/5226549?v=4" width="100px;"/><br /><sub><b>Ari Picker</b></sub>](https://twitter.com/Pickra5000)<br />[💻](https://github.com/zouhir/jarvis/commits?author=Pickra "Code") | [<img src="https://avatars2.githubusercontent.com/u/26097311?v=4" width="100px;"/><br /><sub><b>Marius Niveri</b></sub>](https://maniyt.de)<br />[💻](https://github.com/zouhir/jarvis/commits?author=m4r1vs "Code") | [<img src="https://avatars0.githubusercontent.com/u/6944095?v=4" width="100px;"/><br /><sub><b>Gagan</b></sub>](https://github.com/gagan0723)<br />[📖](https://github.com/zouhir/jarvis/commits?author=gagan0723 "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/9312426?v=4" width="100px;"/><br /><sub><b>石发磊</b></sub>](https://github.com/safarishi)<br />[📖](https://github.com/zouhir/jarvis/commits?author=safarishi "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/15126380?v=4" width="100px;"/><br /><sub><b>ZiYingMai</b></sub>](https://github.com/Sunshine168)<br />[💻](https://github.com/zouhir/jarvis/commits?author=Sunshine168 "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars3.githubusercontent.com/u/10326464?v=4" width="100px;"/><br /><sub><b>rachmulvey</b></sub>](https://github.com/rachmulvey)<br />[💻](https://github.com/zouhir/jarvis/commits?author=rachmulvey "Code") | [<img src="https://avatars1.githubusercontent.com/u/1705507?v=4" width="100px;"/><br /><sub><b>Stephan Schneider</b></sub>](https://github.com/zcei)<br />[📖](https://github.com/zouhir/jarvis/commits?author=zcei "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/1403911?v=4" width="100px;"/><br /><sub><b>Christopher Peng</b></sub>](https://github.com/Cap32)<br />[💻](https://github.com/zouhir/jarvis/commits?author=Cap32 "Code") | [<img src="https://avatars3.githubusercontent.com/u/984628?v=4" width="100px;"/><br /><sub><b>Francesco Soncina</b></sub>](https://www.linkedin.com/in/phraa/)<br />[💻](https://github.com/zouhir/jarvis/commits?author=phra "Code") | [<img src="https://avatars0.githubusercontent.com/u/8846086?v=4" width="100px;"/><br /><sub><b>Jeremy Monson</b></sub>](http://www.forecastme.io)<br />[💻](https://github.com/zouhir/jarvis/commits?author=monsonjeremy "Code") | [<img src="https://avatars0.githubusercontent.com/u/1333999?v=4" width="100px;"/><br /><sub><b>Gusten</b></sub>](https://github.com/gust42)<br />[💻](https://github.com/zouhir/jarvis/commits?author=gust42 "Code") | [<img src="https://avatars1.githubusercontent.com/u/11145949?v=4" width="100px;"/><br /><sub><b>Tamas Sule</b></sub>](https://github.com/xjmdoo)<br />[💻](https://github.com/zouhir/jarvis/commits?author=xjmdoo "Code") |
| [<img src="https://avatars3.githubusercontent.com/u/3317423?v=4" width="100px;"/><br /><sub><b>remmy hume</b></sub>](http://remics.net)<br />[💻](https://github.com/zouhir/jarvis/commits?author=remhume "Code") | [<img src="https://avatars2.githubusercontent.com/u/2655379?v=4" width="100px;"/><br /><sub><b>Michael Persson</b></sub>](https://github.com/mippzon)<br />[📖](https://github.com/zouhir/jarvis/commits?author=mippzon "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/5553498?v=4" width="100px;"/><br /><sub><b>Zach Gawlik</b></sub>](https://zachgawlik.com/)<br />[💻](https://github.com/zouhir/jarvis/commits?author=ZachGawlik "Code") [📖](https://github.com/zouhir/jarvis/commits?author=ZachGawlik "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8447007?s=460&v=4" width="100px;"/><br /><sub><b>Khachatur</b></sub>](https://github.com/Khachatour)<br />[💻](https://github.com/zouhir/jarvis/commits?author=Khachatour "Code") | [<img src="https://avatars1.githubusercontent.com/u/5621996?s=460&v=4" width="100px;"/><br /><sub><b>Timo M. Staudinger</b></sub>](https://github.com/TimoSta)<br />[💻](https://github.com/zouhir/jarvis/commits?author=TimoSta "Code")|

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!

## Credits

* [Webpack Dashboard by Formidable Labs](https://github.com/FormidableLabs/webpack-dashboard)

## License

[MIT © Zouhir](https://oss.ninja/mit/zouhir)
