# SmashingConf2019NYC
Sample component page with live preview, form, and API tables

This is the sample page I demonstrated during my presentation at SmashingConf in NYC, October 15, 2019. It's a simple example that shows how a live component demo could be configured to stay in sync with the data that drives the component. It's not packaged for distribution, nor is it a fully featured component page :), but I've added a license if you'd like to reuse any of it. 

## This runs on:
* [11ty](https://www.11ty.io/), a very simple (and yet incredibly useful) static site generator
* [jQuery](https://www.npmjs.com/package/jquery), but it's not a requirement -- you could recreate this with any JavaScript library or homegrown
* [X-rayHTML](https://github.com/filamentgroup/X-rayHTML) is a little script we use for our Filament Group documentation projects to display component code
  * [js-beautify](https://www.npmjs.com/package/js-beautify) helps out with X-rayHTML
* [Vue](https://vuejs.org/) let's us change the DOM by manipulating JSON

## To view it locally:
Clone this repo to your machine and then run:
```
npm install
```
...mostly for 11ty to work. The dependencies listed above are in a package.json file, however this example code is not set up to import packages (maybe a future version will be). 

Then run
```
npx eleventy --serve
```
to serve up the page. (See [11ty's getting started page](https://www.11ty.io/docs/getting-started/#step-5-gaze-upon-your-templates) for more info on running 11ty.)

