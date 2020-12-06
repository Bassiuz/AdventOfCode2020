const fs = require('fs')

fs.readFile('day6/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n\n')

    var total = 0;
    for (i = 0; i < dataList.length; i++) {
        total = total + getDistinctAnswersForString(dataList[i].split('\n').join('')).length;
    }

    console.log(total);

})

function getDistinctAnswersForString(string) {
    var answers = []
    for (j = 0; j < string.length; j++) {
        if (!answers.includes(string[j])) {
            answers.push(string[j]);
        }
    }
    return answers
}