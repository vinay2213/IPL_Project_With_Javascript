const parser = require("csv-parser");
const fs = require("fs");

const matches = [];

fs.createReadStream("src/data/matches.csv")
  .pipe(parser({}))
  .on("data", (match) => {
    matches.push(match);
  })
  .on("end", () => {
    FindmatchesPerYear(matches);
  });

function FindmatchesPerYear(matches) {
  const matchesPerYear = {};

  matches.forEach((match) => {
    const year = match.season;

    if (matchesPerYear[year]) {
      matchesPerYear[year]++;
    } else {
      matchesPerYear[year] = 1;
    }
  });

  fs.writeFileSync(
    "src/public/output/matchesPerYear.json",
    JSON.stringify(matchesPerYear)
  );
}
