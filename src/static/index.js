// pull in desired CSS/SASS files
require( './styles/main.scss' );
var $ = jQuery = require( '../../node_modules/jquery/dist/jquery.js' );           // <--- remove if jQuery not needed
require( '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js' );   // <--- remove if Bootstrap's JS not needed 

// annotators
var sample = require('./annotators/sample.js');
var soundth = require('./annotators/soundth.js');

// inject bundled Elm app into div#main
var Elm = require( '../elm/Main' );
var app = Elm.Main.embed( document.getElementById( 'main' ) );

app.ports.applyAnnotation.subscribe(function(id) {
    switch (id) {
        case 1:
            sample.run();
            break;

        case 2:
            soundth.run();
            break;

        default:
            console.log('default');
    }
});
