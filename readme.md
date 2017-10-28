<h1 align="center">
  <img src="https://github.com/zouhir/jarvis/blob/master/.github/logo.png?raw=true" width="200">
    <br />
    JARVIS
    <br />
    <br />
</h1>

<h4 align="center">Just A Rather Very Intelligent System and Dashboard for Webpack</h4>


#### Usage:

`npm i -D webpack-jarvis@beta`

Replace your webpack-dev-server command with

`NODE_ENV=development jarvis --dev`

Replace your webpack prod build command with:

`NODE_ENV=production jarvis --prod`

We will look by default at `webpack.config.js` if you have another name than the default one please pass it as:

`NODE_ENV=something jarvis --config not-the-default-config-name.js --dev`

#### DEV: Setting up the project

`$ git clone https://github.com/zouhir/jarvis.git`

`$ npm i`

`$ npm run dev`

or

`$ npm run client`

`$ npm run server`

Run the client

`http://localhost:3000`

#### What's Next?

The modules are hooked to run on `demo-app` change anything there eg. cause an error and you should 
see that getting compiled in Node.js and visualized eventually in the browser.