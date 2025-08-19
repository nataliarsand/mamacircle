module.exports = function (eleventyConfig) {
    // Copy assets folder to _site
    eleventyConfig.addPassthroughCopy("assets");
  
    return {
      markdownTemplateEngine: "liquid",
      htmlTemplateEngine: "liquid",
      dataTemplateEngine: "liquid",
      dir: {
        input: ".",       // Source folder
        includes: "_includes",
        data: "_data",
        output: "_site"   // Output folder
      }
    };
  };
  