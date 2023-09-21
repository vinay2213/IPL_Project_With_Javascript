const parser = require("csv-parser");
const fs = require("fs");

const matches = [];

fs.createReadStream("src/data/matches.csv")
  .pipe(parser({}))
  .on("data", (match) => {
    matches.push(match);
  })
  .on("end", () => {
    findMatchesWonPerTeamPerYear(matches);
  });

function findMatchesWonPerTeamPerYear(matches) {
  
  const matchesWonPerTeamPerYear = {};

  matches.forEach((match) => {
    const year = match.season;
    const winner = match.winner;

    if (!matchesWonPerTeamPerYear[year]) {
      matchesWonPerTeamPerYear[year] = {};
    }

    if (matchesWonPerTeamPerYear[year][winner]) {
      matchesWonPerTeamPerYear[year][winner] += 1;
    } else {
      matchesWonPerTeamPerYear[year][winner] = 1;
    }
  });

  fs.writeFileSync(
    "src/public/output/matchesWonPerTeamPerYear.json",
    JSON.stringify(matchesWonPerTeamPerYear)
  );
}
