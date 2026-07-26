const { differenceInYears } = require("date-fns");
const { formatInTimeZone } = require("date-fns-tz");
const { toZonedTime } = require("date-fns-tz");
const { ptBR } = require("date-fns/locale/pt-BR");
const Mustache = require("mustache");
const fs = require("fs");

async function generateReadme() {
  const timeZone = "America/Sao_Paulo";
  const birthDate = new Date(2003, 7, 5); //05/08/2003
  const currentDate = new Date();

  const zonedBirthDate = toZonedTime(birthDate, timeZone);
  const zonedCurrentDate = toZonedTime(currentDate, timeZone);

  const actualAge = differenceInYears(zonedCurrentDate, zonedBirthDate);

  console.log({
    birthDate,
    zonedBirthDate,
    currentDate,
    zonedCurrentDate,
    actualAge,
  })

  const generatedAtDate = formatInTimeZone(
    new Date(),
    "America/Sao_Paulo",
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss",
    { locale: ptBR }
  );

  const output = Mustache.render(fs.readFileSync("./main.mustache", "utf8"), {
    age: actualAge,
    generatedAt: generatedAtDate,
  });

  fs.writeFileSync("README.md", output);
}

generateReadme();
