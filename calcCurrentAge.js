const fs = require('fs')
const Mustache = require('mustache')
const { differenceInYears, format } = require("date-fns")
const { ptBR } = require("date-fns/locale/pt-BR")

const generateReadme = () => {
  const actualAge = differenceInYears(new Date(), new Date(2003, 7, 5))
  const generatedAtDate = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  const output = Mustache.render(fs.readFileSync('./main.mustache', 'utf8'), { age: actualAge, generatedAt: generatedAtDate })
  fs.writeFileSync('README.md', output)
};

generateReadme();
