const form = document.querySelector('form');
const selectSource = document.querySelector('#source');
const selectTarget = document.querySelector('#target');
const textToTranslateContainer = document.querySelector('textarea');
const translatedTextContainer = document.querySelector('#translated-sentence');
const notice = document.querySelector('#error-msg')

selectSource.addEventListener('input', () => {
    if (selectSource.value == 'british') selectTarget.value = 'american';
    if (selectSource.value == 'american') selectTarget.value = 'british';
});

selectTarget.addEventListener('input', () => {
    if (selectTarget.value == 'british') selectSource.value = 'american';
    if (selectTarget.value == 'american') selectSource.value = 'british';
});

form.addEventListener('reset', () => {
    translatedTextContainer.innerHTML = '';
});

form.addEventListener('submit', event => {
    event.preventDefault();
    translating();
});

function translating() {

    if (textToTranslateContainer.value == '') notice.innerHTML = 'Error: No text to translate.';
    {
        let data = new URLSearchParams();

        data.append('textToTranslate', textToTranslateContainer.value);
        data.append('sourceLang', selectSource.value);
        data.append('targetLang', selectTarget.value);

        fetch('/api/translate?' + data.toString(), {method: 'GET'}).then(res => res.json()).then(res => {
            translatedTextContainer.innerHTML = res.output;
        }).catch(error => console.log(error));
    }

}