const { program } = require("commander");
const fs = require("node:fs")

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch(error) {
    console.error("Cannot find input file");
    process.exit(1);
  }
}

program
  .name("Zakhar's CLI program")
  .option("-i, --input <file>", "Path to the input JSON file")
  .option("-o, --output <file>", "Path to the output file")
  .option("-d, --display", "Display results")
  .parse();

const opts = program.opts();

if (!opts.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

const data = readJsonFile(opts.input);

if (opts.output) {
  fs.writeFileSync(opts.output, JSON.stringify(data), {encoding: "utf-8"});
}

if (opts.display) {
  console.log(data);
}

