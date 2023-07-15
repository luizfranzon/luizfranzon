const Mustache = require('mustache');
const fs = require('fs');
const mustachePath = './main.mustache';
const birthDate = new Date(2003, 6, 5); // 5th July 2003
const currentDate = new Date();
const millisecondsInAYear = 31536000000;

const generateReadme = () => {
  const actualAge = Math.floor((currentDate - birthDate) / millisecondsInAYear);
  const output = Mustache.render(fs.readFileSync(mustachePath, 'utf8'), { age: actualAge });
  fs.writeFileSync('README.md', output);
};

generateReadme();
