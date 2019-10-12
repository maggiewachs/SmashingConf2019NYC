module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy( "assets/css" );
  eleventyConfig.addPassthroughCopy( "assets/data" );
  eleventyConfig.addPassthroughCopy( "assets/js" );

  /* Markdown plugins */
  let markdownIt = require("markdown-it");
  let markdownItAttrs = require("markdown-it-attrs");
  let markdownItDeflist = require("markdown-it-deflist");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options).use(markdownItAttrs).use(markdownItDeflist);  
  eleventyConfig.setLibrary("md", markdownLib);

	return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "assets",
      data: "_data",
      output: "_dist"
    }
  };	
};