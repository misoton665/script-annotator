
module.exports = {
    modules: [
        {id: "default", run: function(){}},
        require('./annotators/sample.js'),
        require('./annotators/soundth.js'),
        require('./annotators/link2.js'),
        require('./annotators/contentword.js'),
        require('./annotators/sounded.js'),
        require('./annotators/sounds.js'),
        require('./annotators/intonationfinal.js'),
        require('./annotators/pausing.js')
    ]
}