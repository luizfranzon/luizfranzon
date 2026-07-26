const { differenceInYears } = require("date-fns");
const { formatInTimeZone, toZonedTime } = require("date-fns-tz");
const { ptBR } = require("date-fns/locale/pt-BR");
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");

const TIME_ZONE = "America/Sao_Paulo";
const BIRTH_DATE = new Date(2003, 7, 5); // 05/08/2003
const TEMPLATE_PATH = path.join(__dirname, "main.mustache");
const OUTPUT_PATH = path.join(__dirname, "..", "README.md");

function calculateAge(birthDate, now, timeZone) {
  return differenceInYears(
    toZonedTime(now, timeZone),
    toZonedTime(birthDate, timeZone)
  );
}

function formatGeneratedAt(now, timeZone) {
  return formatInTimeZone(
    now,
    timeZone,
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss",
    { locale: ptBR }
  );
}

function renderReadme(templatePath, data) {
  const template = fs.readFileSync(templatePath, "utf8");
  return Mustache.render(template, data);
}

function generateReadme() {
  const now = new Date();

  const readme = renderReadme(TEMPLATE_PATH, {
    age: calculateAge(BIRTH_DATE, now, TIME_ZONE),
    generatedAt: formatGeneratedAt(now, TIME_ZONE),
  });

  fs.writeFileSync(OUTPUT_PATH, readme);
}

generateReadme();
