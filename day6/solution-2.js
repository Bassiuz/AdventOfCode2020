const fs = require('fs')

fs.readFile('day6/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n\n')

    var total = 0;
    for (i = 0; i < dataList.length; i++) {
        total = total + getMatchingAnswersForString(dataList[i]).length;
    }

    console.log(total);

})

function getMatchingAnswersForString(string) {
    const differentPersons = string.split('\n');

    var answers = differentPersons[0].split('');
    for (j = 1; j < differentPersons.length; j++) {
        var newAnswers = [];
        for (k = 0; k < answers.length; k++) {
            if (differentPersons[j].includes(answers[k])) {
                newAnswers.push(answers[k]);
            }
        }
        answers = newAnswers;
    }

    return answers;
}