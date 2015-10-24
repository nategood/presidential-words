// node tfidf.js data/2016/republican/2015-09-16.json [metadata/2016/republican/2015-09-16.json]
var fs = require('fs');
var _ = require('underscore');
var natural = require('natural');
var stemmer = natural.PorterStemmer;
var stopwords = require('./stopwords');

var tokenizer = new natural.WordTokenizer();
var tfidf = new natural.TfIdf();

// Options (requires that a meta data file is provided)
var includeCandidates = true; //true;
var includeModerators = false; //false;

var file = process.argv[2];
var metadata = false;

if (process.argv.length > 3) {
    metadata = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
}

var people = JSON.parse(fs.readFileSync(file, 'utf8'));
var i, names = [], removeStopWords;

removeStopWords = function(text) {
    var i;
    for (i in stopwords) {
        text = text.replace(new RegExp('\\b' + stopwords[i].replace('\'','\\\'') + '\\b', 'gi'), '');
    }
    return text;
};

var keep = false;
for (i in people) {
    // tfidf.addDocument(people[i], i);
    keep = metadata === false ||
        (metadata.candidates && includeCandidates && metadata.candidates.indexOf(i) !== -1) ||
        (metadata.moderators && includeModerators && metadata.moderators.indexOf(i) !== -1);

    if (!keep) continue;

    tfidf.addDocument(removeStopWords(people[i]));
    names.push(i);
}

for (i = 0; i < names.length; i++) {
    console.log(names[i], _.head(tfidf.listTerms(i), 10));
}

// tfidf.tfidf('family', 'CANDIDATE');
