// node parse.js 'raw/2012/republican/2015-08-06.txt'

var fs = require('fs');
var natural = require('natural');
// var stopwords = require('../stopwords');
// var stemmer = natural.PorterStemmer;
// var tokenizer = new natural.WordTokenizer();

var d, i, people, person, line, tokens, re, re2, file;
people = {};

file = process.argv[2];
d = fs.readFileSync(file, 'utf8');
d = d.split(/\n+/);

for (i in d) {
    line = d[i];
    re = /^[A-Z'’ \-]+\:/;
    re2 = /(\(|\[)[A-Z ]+?(\)|\])/gi;
    if (!line) continue;
    matches = line.match(re);
    if (matches) {
        person = matches[0].replace(':', '');
        line = line.replace(re, '');
        if (!(person in people)) people[person] = '';
    }
    if (!person) continue;
    line = line.replace(re2, '');
    people[person] += line + ' '; // people[person] = people[person].concat(tokens);
}

fs.writeFileSync(file.replace('.txt', '.json').replace('raw', 'data'), JSON.stringify(people));
