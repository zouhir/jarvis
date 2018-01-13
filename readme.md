<h1 align="center">
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-logo.png?raw=true" width="636">
</h1>

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-about.png?raw=true" width="100%">
</p>

J.A.R.V.I.S. (Just A Rather Very Intelligent System) will put in your browser all the relevant information you need from your webpack build whether in dev or in prod.

It is packed in features even it is still in beta, and a lot of what you see now will hopefully improve the way you look at webpack-dev-server or production build chunks and output.

It is of course hugely inspired by other webpack-dashboard and the core idea is not original, so thank you for Open Sourcers who showed me the road.

Original Features:

* Shows you what of your imported modules are ES Harmony modules and can be treeshakable.
* shows you how well your assets perform in 12 different connection types.

Tech Stack:

* Preact
* Sass
* Socket IO
* Express

Credits:

* [Webpack Dashboard by Formidable Labs](https://github.com/FormidableLabs/webpack-dashboard)

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-installation.png?raw=true" width="100%">
</p>

```
$ npm i -D webpack-jarvis
```

and then in your webpack config file:

```
const Jarvis = require('webpack-jarvis');

// the rest of your webpack configs

plugins: [
    new Jarvis() // that's all you need!
]
```

Go to your browser and open:

```
localhost:1337
```

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-help.png?raw=true" width="100%">
</p>

I am not entirely sure how many bugs you will catch, but what I know for sure the whole app, especially the client Preact app can be dramatically improved, JS & CSS and structure wise as the whole thing has been built in a rush in a very hacky way.

Any contribution can make a difference, even filing an issue, however if you are reading this and you still learning Web Dev and would like to contribute to OSS, I am happy to mentor you and refactor with you the client side app.

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-roadmap.png?raw=true" width="100%">
</p>

On the roadmap:

* Improve code quality, especially for the client side app.
* Bundle size analyzer like feature in the table
* **Oppurtunities Section** to suggest loaders, plugins, etc.. that can improve your build and bundle.

<br />
<br />
<p>
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/readme-contributors.png?raw=true" width="100%">
</p>

_a super cool design will go here listing all contributors names + GitHub avatar_
