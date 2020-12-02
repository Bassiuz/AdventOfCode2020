const fs = require('fs')

fs.readFile('day2/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')

    const validPasswords = [];

    for (i = 0; i < dataList.length; i++) {
        const passwordInfo = dataList[i].split(' ');
        const password = passwordInfo[2];
        const characterToCheck = passwordInfo[1].replace(':', '');
        const minimumAmount = passwordInfo[0].split('-')[0];
        const maximumAmount = passwordInfo[0].split('-')[1];
        const amountOfCharacterInPassword = password.split(characterToCheck).length - 1;

        if (amountOfCharacterInPassword >= minimumAmount && amountOfCharacterInPassword <= maximumAmount) {
            console.log(dataList[i]);
            validPasswords.push(dataList[i]);
        }
    }

    console.log("amount of valid passwords: " + validPasswords.length);
})