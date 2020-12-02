const fs = require('fs')

fs.readFile('day2/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')

    const validPasswords = [];

    for (i = 0; i < dataList.length; i++) {
        const passwordInfo = dataList[i].split(' ');
        const password = passwordInfo[2];
        const characterToCheck = passwordInfo[1].replace(':', '');
        const firstPosition = passwordInfo[0].split('-')[0];
        const secondPosition = passwordInfo[0].split('-')[1];

        const characterInFirstPosition = password.substring(firstPosition - 1, firstPosition)
        const characterInSecondPosition = password.substring(secondPosition - 1, secondPosition)

        var amountOfCharactersRight = 0;
        if (characterInFirstPosition == characterToCheck) {
            amountOfCharactersRight++;
        }

        if (characterInSecondPosition == characterToCheck) {
            amountOfCharactersRight++;
        }

        if (amountOfCharactersRight == 1) {
            console.log(dataList[i]);
            validPasswords.push(dataList[i]);
        }
    }

    console.log("amount of valid passwords: " + validPasswords.length);
})