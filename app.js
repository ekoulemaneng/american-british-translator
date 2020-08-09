const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

const {translate} = require('./scripts/translate');
const {americanToBritishLexicon, britishToAmericanLexicon} = require('./scripts/lexicons');

// Routes

app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));

app.get('/api/translate', (req, res) => {

    let textToTranslate = req.query.textToTranslate;
    let sourceLang = req.query.sourceLang;
    let targetLang = req.query.targetLang;

    let textTranslated = '';
    let lexicon = {};

    if (textToTranslate == '') res.json({output: 'Error: No text to translate.'})
    else if (sourceLang == targetLang) textTranslated = textToTranslate;
    else {
        if (sourceLang == 'american' && targetLang == 'british') lexicon = americanToBritishLexicon;
        else if (sourceLang == 'british' && targetLang == 'american') lexicon = britishToAmericanLexicon;
        else res.json({output: 'Unknown language(s)'});
        textTranslated = translate(textToTranslate, lexicon);
    }

    res.json({output: textTranslated});

});

app.use((err, req, res, next) => res.status(500).send('Something broke!'));

app.use((req, res, next) => res.status(404).send('Sorry cant find that!'));

app.listen(3000);
