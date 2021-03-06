# The M Machine | Glare
Built with React, Redux, and Firebase.<br/>
Based on fanatastic work by [r-park](https://github.com/r-park/todo-react-redux)

Quick Start
-----------

```shell
# Clone the Repo
$ git clone https://github.com/cannoneyed/tmm-glare
$ cd tmm-glare

# Install dependencies - Make sure you're using npm@3 and node>4
$ npm install

# Decrypt the firebase credentials using the secret key (ask Andy)
$ brew install git-crypt
$ git-crypt <path to the secret key>

# Start the app
$ npm start

```

Learn
-----

- [React](https://facebook.github.io/react/docs/getting-started.html)
- [Redux](http://redux.js.org/index.html)
- [Firebase](https://www.firebase.com/docs/web/guide/)

Commands
--------

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000`|
|`npm run build`|Lint, test, and build the application to `./target`|
|`npm run dev`|Same as `npm start`|
|`npm run lint`|Lint `.js` files|
|`npm run server`|Start express server @ `localhost:3000` to serve built artifacts from `./target` (must run `npm run build` first)|
