var runner = require('./annotationRunner.js');

function annotate(app, text) {
  app.ports.annotateRhythm.send(text);
}

app.ports.onAnnotated.subscribe(function (text){

});

module.exports = {
  id: "rhythm",
  annotate: annotate,
  onAnnotated: onAnnotated,
  type: runner.types.all,
  priority: 0
};
