# NG-NL 2016 contest

Create a web game with AngularJS that allows a player to (manually) solve a nonogram ("Japanese puzzle").

# My solution

I've implemented the nonogram web game using Angular 1.5, and took the opportunity to learn more about the following technologies while programming it:

* Angular 1.5 `.component()` method
* CSS Flexbox, see also http://flexboxfroggy.com/ :)
* Require1k as a CommonJS module loader in the browser
* Writing NodeJS unit test with Mocha

## Demo!

Play the game at http://oliver3.nl/nonogram

## Running locally

* Run `bower install`
* Open the index.html using http, e.g. using IntelliJ "Open in Browser" or with `npm install -g http-server && http-server`

You can run the mocha tests with `mocha nonogram-solver.spec.js`


