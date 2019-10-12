# SmashingConf2019NYC
Sample component page with live preview, form, and API tables

This is the sample page I demonstrated during my presentation at SmashingConf in NYC, October 15, 2019. It's a simple example that shows how a live component demo could be configured to stay in sync with the data that drives the component. It's not packaged for distribution, nor is it a fully featured component page :), but I've added a license if you'd like to reuse any of it. 

## This demo runs on:
* [11ty](https://www.11ty.io/), a very simple (and yet incredibly useful) static site generator
* [jQuery](https://www.npmjs.com/package/jquery), but it's not a requirement -- you could recreate this with any JavaScript library or homegrown
* [X-rayHTML](https://github.com/filamentgroup/X-rayHTML) is a little script we use for our Filament Group documentation projects to display component code
  * [js-beautify](https://www.npmjs.com/package/js-beautify) helps out with X-rayHTML
* [Vue](https://vuejs.org/) let's us change the DOM by manipulating JSON
