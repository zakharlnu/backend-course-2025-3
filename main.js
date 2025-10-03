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
  .option("-f, –furnished", "Display only furnished houses")
  .option("-p, --price <value>", "Display only houses with price less than the specified value")
  .parse();

const opts = program.opts();

if (!opts.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data = readJsonFile(opts.input);

if (opts.furnished) {
  data = data.filter((house) => house.furnishingstatus === "furnished");
}

if (opts.price) {
  data = data.filter((house) => house.price < parseFloat(opts.price));
}

let output = "";

if (opts.output) {
  data.forEach((house) => {
    output += `${house.price} ${house.area}\n`;
  });
  fs.writeFileSync(opts.output, output, {encoding: "utf-8"});
}

if (opts.display) {
  console.log(output);
}