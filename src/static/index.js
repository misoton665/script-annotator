// pull in desired CSS/SASS files
require('./styles/main.scss');
var $ = jQuery = require('../../node_modules/jquery/dist/jquery.js');           // <--- remove if jQuery not needed
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');   // <--- remove if Bootstrap's JS not needed 

// annotators
var annotators = require('./annotators.js');
var runner = require('./annotators/annotationRunner.js');

// inject bundled Elm app into div#main
var Elm = require('../elm/Main');
var app = Elm.Main.embed(document.getElementById('main'));

app.ports.applyAnnotation.subscribe(function (id) {
    var input = document.getElementById('input').value;

    annotators.modules.forEach(function (annotator) {
        if (annotator.id == id) {
            runner.run(app, annotator, input);
        }
    });
});

app.ports.applyMultiAnnotations.subscribe(function (ids) {
    var input = document.getElementById('input').value;

    var annos = [];
    annotators.modules.forEach(function (annotator) {
        ids.forEach(function(id) {
            if (annotator.id == id) {
                annos.push(annotator);
            }
        });
    });

    console.log(annos);

    runner.runMulti(app, annos, input);
});

app.ports.speakInputText.subscribe(function () {
    var input = document.getElementById('input').value;
    var suu = new SpeechSynthesisUtterance(input);
    suu.lang = 'en-US';
    speechSynthesis.speak(suu);
});