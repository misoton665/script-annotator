
function compairAnnotators(a, b) {
    return a.priority - b.priority;
}

module.exports = {
    modules: [
        {id: "default", run: function(){}, type: 0, priority: 0},
        {id: "wordStress", run: function(){}, type: 0, priority: 0},
        require('./annotators/soundth.js'),
        require('./annotators/link.js'),
        require('./annotators/link2.js'),
        require('./annotators/contentword.js'),
        require('./annotators/sounded.js'),
        require('./annotators/sounds.js'),
        require('./annotators/intonationfinal.js'),
        require('./annotators/pausing.js')
    ].sort(compairAnnotators)
}