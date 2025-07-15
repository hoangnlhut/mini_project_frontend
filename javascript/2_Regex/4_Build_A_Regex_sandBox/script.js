const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');

const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

function getFlags(){
    var flags = "";
    if(caseInsensitiveFlag.checked) flags += "i";
    if(globalFlag.checked) flags += "g";
    return flags;
}

function validateInput() {
    if(regexPattern.value === '') {
        alert('Please enter a regex pattern.');
        return;
    }

    if(stringToTest.textContent === '') {
        alert('Please enter test string.');
        return;
    }
}

testButton.addEventListener('click', () => {
    validateInput();

    const patternInput = regexPattern.value;
    const flags = getFlags();
    const regex = new RegExp(patternInput,flags);

    let resultLast = stringToTest.textContent.match(regex);
    if(!resultLast)
    {
        testResult.textContent = 'no match';
        return;
    }

    if (resultLast.length > 1) {
        const matches = [...stringToTest.textContent.matchAll(regex)];

         // Build highlighted string
        let highlighted = "";
        let lastIndex = 0;

        matches.forEach(match => {
            highlighted += stringToTest.textContent.slice(lastIndex, match.index);
            highlighted += `<span class="highlight">${match[0]}</span>`;
            lastIndex = match.index + match[0].length;
        });

        highlighted += stringToTest.textContent.slice(lastIndex);
        stringToTest.innerHTML = highlighted;

        // Display matches in result
        const matchTexts = matches.map(m => m[0]).join(", ");
        testResult.textContent = matchTexts;
    }
    else{
        stringToTest.innerHTML = stringToTest.textContent.replace(resultLast, `<span class="highlight">${resultLast}</span>`);
        testResult.textContent = resultLast;
    }
});


