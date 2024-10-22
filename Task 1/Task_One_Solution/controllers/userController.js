const fs = require('fs');
const JSONStream = require('JSONStream');
const fastCsv = require('fast-csv');
const { v4: uuidv4 } = require('uuid');
const { decrypt } = require('../services/encryptionService');


const processUsers = async () => {
  const uniqueUsers = new Map();
  const usersStream = fs.createReadStream('./data/users.json').pipe(JSONStream.parse('*'));

  usersStream.on('data', (user) => {
    if (!uniqueUsers.has(user.email)) {
      user.id = uuidv4();
      uniqueUsers.set(user.email, user);
    }
  });

  usersStream.on('end', () => {
    const uniqueArray = Array.from(uniqueUsers.values());
    fs.writeFileSync('./data/uniqueUsers.json', JSON.stringify(uniqueArray));
    generateCsv(uniqueArray);
  });
};


const generateCsv = (users) => {
  const csvStream = fastCsv.format({ headers: true });
  const writableStream = fs.createWriteStream('./data/users.csv');

  csvStream.pipe(writableStream);
  users.forEach((user) => {
    csvStream.write({
      Name: user.name,
      Surname: user.surname,
      Duplicates: 1, 
    });
  });
  csvStream.end();
};

module.exports = { processUsers };
