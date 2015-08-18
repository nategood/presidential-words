var fs = require('fs');
var _ = require('underscore');
var natural = require('natural');
var stemmer = natural.PorterStemmer;
var stopwords = require('./stopwords');

var tokenizer = new natural.WordTokenizer();
var tfidf = new natural.TfIdf();

var file = process.argv[2];

var people = JSON.parse(fs.readFileSync(file, 'utf8'));
var i, count = 0, names = [], removeStopWords;
// var candidates = ["TRUMP", "PAUL", "CARSON", "RUBIO", "BUSH", "CRUZ", "CHRISTIE", "WALKER", "HUCKABEE", "KASICH"];
// var moderators = ["KELLY", "BAIER", "WALLACE"];

removeStopWords = function(text) {
    var i;
    for (i in stopwords) {
        text = text.replace(new RegExp('\\b' + stopwords[i].replace('\'','\\\'') + '\\b', 'gi'), '');
    }
    return text;
};

for (i in people) {
    // tfidf.addDocument(people[i], i);
    // if (candidates.indexOf(i) === -1) continue;
    tfidf.addDocument(removeStopWords(people[i]));
    count++;
    names.push(i);
}

// for (i in people) {
for (i = 0; i < count; i++) {
    console.log(names[i], _.head(tfidf.listTerms(i), 5));
}

// tfidf.tfidf('family', 'CANDIDATE');
