const fs = require('fs');

const matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
const officialSchedule = [
  { date: "2026-06-11", teams: ["1A", "2A"], venues: ["mexico_city"], group: "A", desc: "Mexico vs South Africa" },
  { date: "2026-06-11", teams: ["3A", "4A"], venues: ["guadalajara"], group: "A", desc: "South Korea vs UEFA playoff D" },
  
  { date: "2026-06-12", teams: ["1B", "2B"], venues: ["toronto"], group: "B", desc: "Canada vs UEFA playoff A" },
  { date: "2026-06-12", teams: ["1D", "2D"], venues: ["los_angeles"], group: "D", desc: "USA vs Paraguay" },
  
  { date: "2026-06-13", teams: ["1C", "2C"], venues: ["boston", "new_york"], group: "C", desc: "Brazil vs Morocco" },
  { date: "2026-06-13", teams: ["3D", "4D"], venues: ["vancouver"], group: "D", desc: "Australia vs UEFA playoff C" },
  { date: "2026-06-13", teams: ["3C", "4C"], venues: ["boston", "new_york"], group: "C", desc: "Haiti vs Scotland" },
  { date: "2026-06-13", teams: ["3B", "4B"], venues: ["san_francisco"], group: "B", desc: "Qatar vs Switzerland" },
  
  { date: "2026-06-14", teams: ["1E", "2E"], venues: ["philadelphia", "houston"], group: "E", desc: "Germany vs Curaçao" },
  { date: "2026-06-14", teams: ["3E", "4E"], venues: ["philadelphia", "houston"], group: "E", desc: "Ivory Coast vs Ecuador" },
  { date: "2026-06-14", teams: ["1F", "2F"], venues: ["dallas", "monterrey"], group: "F", desc: "Netherlands vs Japan" },
  { date: "2026-06-14", teams: ["3F", "4F"], venues: ["dallas", "monterrey"], group: "F", desc: "UEFA playoff B vs Tunisia" },
  
  { date: "2026-06-15", teams: ["1H", "2H"], venues: ["miami", "atlanta"], group: "H", desc: "Spain vs Cape Verde" },
  { date: "2026-06-15", teams: ["3H", "4H"], venues: ["miami", "atlanta"], group: "H", desc: "Saudi Arabia vs Uruguay" },
  { date: "2026-06-15", teams: ["1G", "2G"], venues: ["los_angeles", "seattle"], group: "G", desc: "Belgium vs Egypt" },
  { date: "2026-06-15", teams: ["3G", "4G"], venues: ["los_angeles", "seattle"], group: "G", desc: "Iran vs New Zealand" },
  
  { date: "2026-06-16", teams: ["1I", "2I"], venues: ["new_york", "boston"], group: "I", desc: "France vs Senegal" },
  { date: "2026-06-16", teams: ["3I", "4I"], venues: ["new_york", "boston"], group: "I", desc: "FIFA playoff 2 vs Norway" },
  { date: "2026-06-16", teams: ["1J", "2J"], venues: ["kansas_city", "san_francisco"], group: "J", desc: "Argentina vs Algeria" },
  { date: "2026-06-16", teams: ["3J", "4J"], venues: ["kansas_city", "san_francisco"], group: "J", desc: "Austria vs Jordan" },
  
  { date: "2026-06-17", teams: ["1L", "2L"], venues: ["toronto", "dallas"], group: "L", desc: "England vs Croatia" },
  { date: "2026-06-17", teams: ["3L", "4L"], venues: ["toronto", "dallas"], group: "L", desc: "Ghana vs Panama" },
  { date: "2026-06-17", teams: ["1K", "2K"], venues: ["houston", "mexico_city"], group: "K", desc: "Portugal vs FIFA playoff 1" },
  { date: "2026-06-17", teams: ["3K", "4K"], venues: ["houston", "mexico_city"], group: "K", desc: "Uzbekistan vs Colombia" },
  
  { date: "2026-06-18", teams: ["4A", "2A"], venues: ["atlanta"], group: "A", desc: "UEFA playoff D vs South Africa" },
  { date: "2026-06-18", teams: ["4B", "2B"], venues: ["los_angeles"], group: "B", desc: "Switzerland vs UEFA playoff A" },
  { date: "2026-06-18", teams: ["1B", "3B"], venues: ["vancouver"], group: "B", desc: "Canada vs Qatar" },
  { date: "2026-06-18", teams: ["1A", "3A"], venues: ["guadalajara"], group: "A", desc: "Mexico vs South Korea" },
  
  { date: "2026-06-19", teams: ["1C", "3C"], venues: ["philadelphia", "new_york"], group: "C", desc: "Brazil vs Haiti" },
  { date: "2026-06-19", teams: ["4C", "2C"], venues: ["philadelphia", "new_york"], group: "C", desc: "Scotland vs Morocco" },
  { date: "2026-06-19", teams: ["4D", "2D"], venues: ["san_francisco"], group: "D", desc: "UEFA playoff C vs Paraguay" },
  { date: "2026-06-19", teams: ["1D", "3D"], venues: ["seattle"], group: "D", desc: "USA vs Australia" },
  
  { date: "2026-06-20", teams: ["1E", "3E"], venues: ["toronto", "kansas_city"], group: "E", desc: "Germany vs Ivory Coast" },
  { date: "2026-06-20", teams: ["4E", "2E"], venues: ["toronto", "kansas_city"], group: "E", desc: "Ecuador vs Curaçao" },
  { date: "2026-06-20", teams: ["1F", "3F"], venues: ["houston", "monterrey"], group: "F", desc: "Netherlands vs UEFA playoff B" },
  { date: "2026-06-20", teams: ["4F", "2F"], venues: ["houston", "monterrey"], group: "F", desc: "Tunisia vs Japan" },
  
  { date: "2026-06-21", teams: ["1H", "3H"], venues: ["miami", "atlanta"], group: "H", desc: "Spain vs Saudi Arabia" },
  { date: "2026-06-21", teams: ["4H", "2H"], venues: ["miami", "atlanta"], group: "H", desc: "Uruguay vs Cape Verde" },
  { date: "2026-06-21", teams: ["1G", "3G"], venues: ["los_angeles", "vancouver"], group: "G", desc: "Belgium vs Iran" },
  { date: "2026-06-21", teams: ["4G", "2G"], venues: ["los_angeles", "vancouver"], group: "G", desc: "New Zealand vs Egypt" },
  
  { date: "2026-06-22", teams: ["1I", "3I"], venues: ["new_york", "philadelphia"], group: "I", desc: "France vs FIFA playoff 2" },
  { date: "2026-06-22", teams: ["4I", "2I"], venues: ["new_york", "philadelphia"], group: "I", desc: "Norway vs Senegal" },
  { date: "2026-06-22", teams: ["1J", "3J"], venues: ["dallas", "san_francisco"], group: "J", desc: "Argentina vs Austria" },
  { date: "2026-06-22", teams: ["4J", "2J"], venues: ["dallas", "san_francisco"], group: "J", desc: "Jordan vs Algeria" },
  
  { date: "2026-06-23", teams: ["1L", "3L"], venues: ["boston", "toronto"], group: "L", desc: "England vs Ghana" },
  { date: "2026-06-23", teams: ["4L", "2L"], venues: ["boston", "toronto"], group: "L", desc: "Panama vs Croatia" },
  { date: "2026-06-23", teams: ["1K", "3K"], venues: ["houston", "guadalajara"], group: "K", desc: "Portugal vs Uzbekistan" },
  { date: "2026-06-23", teams: ["4K", "2K"], venues: ["houston", "guadalajara"], group: "K", desc: "Colombia vs FIFA playoff 1" },
  
  { date: "2026-06-24", teams: ["4C", "1C"], venues: ["miami", "atlanta"], group: "C", desc: "Scotland vs Brazil" },
  { date: "2026-06-24", teams: ["2C", "3C"], venues: ["miami", "atlanta"], group: "C", desc: "Morocco vs Haiti" },
  { date: "2026-06-24", teams: ["1B", "4B"], venues: ["vancouver"], group: "B", desc: "Canada vs Switzerland" },
  { date: "2026-06-24", teams: ["2B", "3B"], venues: ["seattle"], group: "B", desc: "UEFA playoff A vs Qatar" },
  { date: "2026-06-24", teams: ["1A", "4A"], venues: ["mexico_city"], group: "A", desc: "Mexico vs UEFA playoff D" },
  { date: "2026-06-24", teams: ["3A", "2A"], venues: ["monterrey"], group: "A", desc: "South Korea vs South Africa" },
  
  { date: "2026-06-25", teams: ["4E", "1E"], venues: ["philadelphia", "new_york"], group: "E", desc: "Ecuador vs Germany" },
  { date: "2026-06-25", teams: ["2E", "3E"], venues: ["philadelphia", "new_york"], group: "E", desc: "Curaçao vs Ivory Coast" },
  { date: "2026-06-25", teams: ["4F", "1F"], venues: ["dallas", "kansas_city"], group: "F", desc: "Tunisia vs Netherlands" },
  { date: "2026-06-25", teams: ["2F", "3F"], venues: ["dallas", "kansas_city"], group: "F", desc: "Japan vs UEFA playoff B" },
  { date: "2026-06-25", teams: ["1D", "4D"], venues: ["los_angeles"], group: "D", desc: "USA vs UEFA playoff C" },
  { date: "2026-06-25", teams: ["2D", "3D"], venues: ["san_francisco"], group: "D", desc: "Paraguay vs Australia" },
  
  { date: "2026-06-26", teams: ["4I", "1I"], venues: ["boston", "toronto"], group: "I", desc: "Norway vs France" },
  { date: "2026-06-26", teams: ["2I", "3I"], venues: ["boston", "toronto"], group: "I", desc: "Senegal vs FIFA playoff 2" },
  { date: "2026-06-26", teams: ["4G", "1G"], venues: ["seattle", "vancouver"], group: "G", desc: "New Zealand vs Belgium" },
  { date: "2026-06-26", teams: ["2G", "3G"], venues: ["seattle", "vancouver"], group: "G", desc: "Egypt vs Iran" },
  { date: "2026-06-26", teams: ["4H", "1H"], venues: ["houston", "guadalajara"], group: "H", desc: "Uruguay vs Spain" },
  { date: "2026-06-26", teams: ["2H", "3H"], venues: ["houston", "guadalajara"], group: "H", desc: "Cape Verde vs Saudi Arabia" },
  
  { date: "2026-06-27", teams: ["4L", "1L"], venues: ["new_york", "philadelphia"], group: "L", desc: "Panama vs England" },
  { date: "2026-06-27", teams: ["2L", "3L"], venues: ["new_york", "philadelphia"], group: "L", desc: "Croatia vs Ghana" },
  { date: "2026-06-27", teams: ["4J", "1J"], venues: ["kansas_city", "dallas"], group: "J", desc: "Jordan vs Argentina" },
  { date: "2026-06-27", teams: ["2J", "3J"], venues: ["kansas_city", "dallas"], group: "J", desc: "Algeria vs Austria" },
  { date: "2026-06-27", teams: ["4K", "1K"], venues: ["miami", "atlanta"], group: "K", desc: "Colombia vs Portugal" },
  { date: "2026-06-27", teams: ["2K", "3K"], venues: ["miami", "atlanta"], group: "K", desc: "FIFA playoff 1 vs Uzbekistan" },
];

function normalizeTeams(teams) {
  return [...teams].sort().join(',');
}

function normalizeVenues(venues) {
  return [...venues].sort().join(',');
}

function findOfficialMatch(dataMatch) {
  const dataTeams = normalizeTeams(dataMatch.teams);
  
  for (const official of officialSchedule) {
    const officialTeams = normalizeTeams(official.teams);
    if (dataTeams === officialTeams) {
      return official;
    }
  }

  return null;
}

console.log('='.repeat(80));
console.log('FIFA World Cup 2026 - Group Stage Schedule Comparison');
console.log('='.repeat(80));
console.log('');

const issues = [];
const groupStageMatches = matchesData.rounds.groupStage.matches;

for (const dataMatch of groupStageMatches) {
  const official = findOfficialMatch(dataMatch);
  
  if (!official) {
    issues.push({
      matchId: dataMatch.id,
      type: 'NO_MATCH',
      message: `No matching official match found for teams ${dataMatch.teams.join(' vs ')}`
    });
    continue;
  }
  
  if (dataMatch.date !== official.date) {
    issues.push({
      matchId: dataMatch.id,
      type: 'DATE_MISMATCH',
      message: `Date mismatch: Data has ${dataMatch.date}, Official has ${official.date}`,
      desc: official.desc
    });
  }
  
  const dataVenues = normalizeVenues(dataMatch.venues);
  const officialVenues = normalizeVenues(official.venues);
  
  if (dataVenues !== officialVenues) {
    issues.push({
      matchId: dataMatch.id,
      type: 'VENUE_MISMATCH',
      message: `Venue mismatch: Data has [${dataMatch.venues.join(', ')}], Official has [${official.venues.join(', ')}]`,
      desc: official.desc,
      dataVenues: dataMatch.venues,
      officialVenues: official.venues
    });
  }
  
  if (dataMatch.group !== official.group) {
    issues.push({
      matchId: dataMatch.id,
      type: 'GROUP_MISMATCH',
      message: `Group mismatch: Data has ${dataMatch.group}, Official has ${official.group}`,
      desc: official.desc
    });
  }
}

if (issues.length === 0) {
  console.log('✅ All group stage matches match the official schedule!');
} else {
  console.log(`❌ Found ${issues.length} discrepancies:\n`);
  
  for (const issue of issues) {
    console.log(`Match ${issue.matchId}: ${issue.type}`);
    console.log(`  ${issue.message}`);
    if (issue.desc) {
      console.log(`  Official match: ${issue.desc}`);
    }
    console.log('');
  }
}

console.log('='.repeat(80));
console.log('Summary:');
console.log('='.repeat(80));
const byType = {};
for (const issue of issues) {
  byType[issue.type] = (byType[issue.type] || 0) + 1;
}
for (const [type, count] of Object.entries(byType)) {
  console.log(`${type}: ${count}`);
}
console.log(`Total issues: ${issues.length}`);

console.log('\n');
console.log('='.repeat(80));
console.log('Group Stage Matchup Rules Verification');
console.log('='.repeat(80));
console.log('');

// Expected matchups for each group (order doesn't matter, just need all 6 matchups)
// Matchday 1: 1 vs 2, 3 vs 4
// Matchday 2: 1 vs 3, 4 vs 2
// Matchday 3: 4 vs 1, 2 vs 3
const requiredMatchups = [
  { teams: [1, 2], desc: '1 vs 2 (Matchday 1)' },
  { teams: [3, 4], desc: '3 vs 4 (Matchday 1)' },
  { teams: [1, 3], desc: '1 vs 3 (Matchday 2)' },
  { teams: [2, 4], desc: '2 vs 4 (Matchday 2)' },
  { teams: [1, 4], desc: '1 vs 4 (Matchday 3)' },
  { teams: [2, 3], desc: '2 vs 3 (Matchday 3)' }
];

const matchesByGroup = {};
for (const match of groupStageMatches) {
  const group = match.group;
  if (!matchesByGroup[group]) {
    matchesByGroup[group] = [];
  }
  matchesByGroup[group].push(match);
}

const matchupIssues = [];

for (const [group, matches] of Object.entries(matchesByGroup)) {
  if (matches.length !== 6) {
    matchupIssues.push({
      group,
      type: 'WRONG_MATCH_COUNT',
      message: `Group ${group} has ${matches.length} matches instead of 6`
    });
  }
  
  const actualMatchups = matches.map(m => {
    const pos1 = parseInt(m.teams[0][0]);
    const pos2 = parseInt(m.teams[1][0]);
    return { 
      teams: [pos1, pos2].sort((a, b) => a - b), 
      matchId: m.id,
      date: m.date
    };
  });
  
  for (const required of requiredMatchups) {
    const reqSorted = [...required.teams].sort((a, b) => a - b);
    const found = actualMatchups.find(
      am => am.teams[0] === reqSorted[0] && am.teams[1] === reqSorted[1]
    );
    
    if (!found) {
      matchupIssues.push({
        group,
        type: 'MISSING_MATCHUP',
        message: `Group ${group} missing matchup: ${required.desc}`
      });
    }
  }
  
  const seen = new Set();
  for (const matchup of actualMatchups) {
    const key = matchup.teams.join('-');
    if (seen.has(key)) {
      matchupIssues.push({
        group,
        type: 'DUPLICATE_MATCHUP',
        message: `Group ${group} has duplicate matchup: ${matchup.teams[0]} vs ${matchup.teams[1]} (${matchup.matchId})`
      });
    }
    seen.add(key);
  }
}

if (matchupIssues.length === 0) {
  console.log('✅ All groups follow the correct matchup rules!');
  console.log('');
  console.log('Verified for all 12 groups:');
  console.log('  - Each group has exactly 6 matches');
  console.log('  - All required matchups present: 1v2, 3v4, 1v3, 2v4, 1v4, 2v3');
  console.log('  - No duplicate matchups');
  console.log('');
  console.log('Note: Host countries (USA, Canada, Mexico) may have matches');
  console.log('      spread across different dates within the same matchday.');
} else {
  console.log(`❌ Found ${matchupIssues.length} matchup rule violations:\n`);
  
  for (const issue of matchupIssues) {
    console.log(`Group ${issue.group}: ${issue.type}`);
    console.log(`  ${issue.message}`);
    console.log('');
  }
}

console.log('\n');
console.log('='.repeat(80));
console.log('Final Summary');
console.log('='.repeat(80));
console.log(`Schedule issues: ${issues.length}`);
console.log(`Matchup rule issues: ${matchupIssues.length}`);
console.log(`Total issues: ${issues.length + matchupIssues.length}`);
