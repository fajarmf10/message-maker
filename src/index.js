const fs = require("fs");
const path = require('path')

function saveToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

const {
    MULTI
} = process.env;

function singleInvitation() {
    const guestlist = require('../undanganSingle/guestlist.json');

    const messageTemplate = `Bismillahirrahmanirrahim.
Come join us for a casual party to celebrate our "happily ever after"!
With joy in our hearts, we invite you to our wedding. Details can be found below:

https://annisa.fajarfirdaus.net/kitanikah/?to=PLACEHOLDER_IG

Two things that will make us incredibly happy on the day of our wedding are the ceremony and you being there for us.
Kindly fill out the RSVP form to notify us of your attendance, and don't hesitate to ping us if you encounter an issue. See you 🫶🏽

Warm Regards,
Fajar & Annisa`

    for (const guest of guestlist) {
        const message = messageTemplate.replace('PLACEHOLDER_IG', guest.instagram);
        const filename = `../result/single/${guest.instagram}.txt`;
        saveToFile(filename, message);
    }

    console.log('Done!')
    process.exit(0);
}

function multiInvitation() {
    const messageTemplate = `To these beautiful souls (FILENAME_WITHOUT_EXTENSION), come join us for a casual party to celebrate our "happily ever after"!
With joy in our hearts, we invite you to our wedding. Please scroll through this message to find your invitation ☺️

LIST_OF_MESSAGE

Two things that will make us incredibly happy on the day of our wedding are the ceremony and you being there for us.
Kindly fill out the RSVP form to notify us of your attendance, and don't hesitate to ping us if you encounter an issue. See you 🫶🏽

Warm Regards,
Fajar & Annisa`;

    const jsonFiles = fs.readdirSync('../listUndanganMulti')
        .filter(
            file => path.extname(file) === '.json'
        );

    jsonFiles.forEach(jsonFile => {
        const perLineMessage = []
        const dataJsons = JSON.parse(fs.readFileSync(path.join('../listUndanganMulti', jsonFile)));
        for (const dataJson of dataJsons) {
            const messagePerLine = `> ${dataJson.nama}: https://annisa.fajarfirdaus.net/kitanikah/?to=${dataJson.instagram}`
            perLineMessage.push(messagePerLine);
        }
        const joinedMessage = perLineMessage.join('\n');
        const groupName = jsonFile.replace('.json', '');
        const finalMessage = messageTemplate.replace('LIST_OF_MESSAGE', joinedMessage).replace('FILENAME_WITHOUT_EXTENSION', groupName);
        const filename = `../result/multi/${groupName}.txt`;
        saveToFile(filename, finalMessage);
    })

    console.log('Done!')
    process.exit(0);
}

if (!MULTI) {
    singleInvitation();
}

multiInvitation();
