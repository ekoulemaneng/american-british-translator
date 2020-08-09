const translate = (textToTranslate, lexicon) => {

    let translatedText = textToTranslate;

    for (const entry in lexicon) {

        let strToTranslate = '';
        let strTranslated = '';
        let n = entry.length;

        if (entry.charAt(n - 1) == '.') {
            // strToTranslate = '\\b' + entry.slice(0, n - 1) + '\\.\\s';
            strToTranslate = '\\b' + entry.slice(0, n - 1) + '\\.\\s(?!([\\w\\s:.]*<\\/span>))';
            strTranslated = '<span class="highlight">' + lexicon[entry] + ' </span>';
        }
        else {
            // strToTranslate = '\\b' + entry + '\\b';
            strToTranslate = '\\b' + entry + '\\b(?!([\\w\\s:.]*<\\/span>))';
            strTranslated = '<span class="highlight">' + lexicon[entry] + '</span>';
        }

        let regex = new RegExp(strToTranslate, 'gi');

        translatedText = translatedText.replace(regex, strTranslated);

    }

    if (textToTranslate === translatedText) translatedText = 'Everything looks good to me!';

    return translatedText.charAt(0).toUpperCase() + translatedText.slice(1);

}

exports.translate = translate;