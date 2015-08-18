node parse.js FILE - Used to parse the raw text file (raw/YEAR/category/file.txt) into a JSON object broken down by candidate and stores it to data/YEAR/category/file.json

node tfidf.js FILE - Takes the JSON breakdown (data/YEAR/category/file.json) and does a tfidf where each candidate is a document