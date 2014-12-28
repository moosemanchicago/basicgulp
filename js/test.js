// requires version 1.3.4 of BrowserSync or higher.
var browserSync  = require("browser-sync");
var htmlInjector = require("bs-html-injector");


// register the plugin
browserSync.use(htmlInjector, {
    // Files to watch that will trigger the injection
    files: "*.html" 
});

// now run BrowserSync, watching CSS files as normal
browserSync({
  files: "css/*.css"
});