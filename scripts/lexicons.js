const {americanOnly} = require('./american-only');
const {americanToBritishSpelling} = require('./american-to-british-spelling');
const {americanToBritishTitles} = require('./american-to-british-titles');
const {britishOnly} = require('./british-only');

const invertKeysValues = (obj) => {
    let result = {};
    for (const property in obj) {
        result[obj[property].toString()] = property;
    }
    return result;
}

let americanToBritishLexicon = {...americanOnly, ...americanToBritishSpelling, ...americanToBritishTitles, ...{'(\\d{1,2}):(\\d{2})': '$1.$2'}};
let britishToAmericanLexicon = {...britishOnly, ...invertKeysValues(americanToBritishSpelling), ...invertKeysValues(americanToBritishTitles), ...{'(\\d{1,2}).(\\d{2})': '$1:$2'}};

exports.americanToBritishLexicon = americanToBritishLexicon;
exports.britishToAmericanLexicon = britishToAmericanLexicon;
