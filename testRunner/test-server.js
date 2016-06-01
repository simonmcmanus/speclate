var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

//provide browserified versions of all the files in a directory
app.use('/spec', browserify(process.cwd() + '/spec'));
app.use(express.static(process.cwd() + '/spec/sample'));

app.use(express.static(process.cwd() + '/testRunner'));


app.listen(3000);