const { differenceInYears, format } = require("date-fns");
const { ptBR } = require("date-fns/locale/pt-BR");
const Mustache = require("mustache");
const fs = require("fs");

async function generateReadme() {
  const actualAge = differenceInYears(new Date(), new Date(2003, 7, 5));

  const generatedAtDate = format(
    new Date(),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss",
    {
      locale: ptBR,
    }
  );

  const output = Mustache.render(fs.readFileSync("./main.mustache", "utf8"), {
    age: actualAge,
    generatedAt: generatedAtDate,
  });

  fs.writeFileSync("README.md", output);
}

generateReadme();
