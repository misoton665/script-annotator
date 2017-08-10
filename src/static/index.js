// pull in desired CSS/SASS files
require('./styles/main.scss');
var $ = jQuery = require('../../node_modules/jquery/dist/jquery.js');           // <--- remove if jQuery not needed
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');   // <--- remove if Bootstrap's JS not needed 

// annotators
var annotators = require('./annotators.js');

// inject bundled Elm app into div#main
var Elm = require('../elm/Main');
var app = Elm.Main.embed(document.getElementById('main'));

app.ports.applyAnnotation.subscribe(function (id) {
    var input = document.getElementById('input').value;

    annotators.modules.forEach(function (annotator) {
        if (annotator.id == id) {
            annotator.run(input);
        }
    });
});
