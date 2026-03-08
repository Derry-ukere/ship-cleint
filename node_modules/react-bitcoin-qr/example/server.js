/**
* FOR USAGE EXAMPLE SEE ./example.jsx *
THIS CODE IS FOR THROWING UP A SERVER TO HOST example.jsx
**/

/** 
    Browserify/babelify the test code
**/
console.log('Browserifying the example code... (confirm ./bundle.js is produced)')

var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var Q = require('q')

var examplePath = path.dirname(process.argv[1])
if(process.cwd() !== examplePath) {
    process.chdir(examplePath)
}

var bundleStream = browserify('example.jsx')
    .transform("babelify", {
        presets: ["react"]
    })
  .bundle()
  .pipe(fs.createWriteStream('bundle.js'))

console.log("Bundling...")

/**
    Host the demo at http://localhost:3000/index.html 
**/
Q.ninvoke(bundleStream, 'on', 'finish').then(function() {
    console.log("Bundling finished")
    var simpleServer = require('simple-server')
    console.log("React Bitcoin QR demo page is hosted at http://localhost:3000/index.html");
})
