const fs = require('fs');

const matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

// Official schedule with final venues (no longer uncertain)
const officialSchedule = [
  { date: "2026-06-11", teams: ["1A", "2A"], venue: "mexico_city", group: "A", desc: "Mexico vs South Africa" },
  { date: "2026-06-11", teams: ["3A", "4A"], venue: "guadalajara", group: "A", desc: "South Korea vs UEFA playoff D" },
  
  { date: "2026-06-12", teams: ["1B", "2B"], venue: "toronto", group: "B", desc: "Canada vs UEFA playoff A" },
  { date: "2026-06-12", teams: ["1D", "2D"], venue: "los_angeles", group: "D", desc: "USA vs Paraguay" },
  
  { date: "2026-06-13", teams: ["1C", "2C"], venue: "new_york", group: "C", desc: "Brazil vs Morocco" },
  { date: "2026-06-13", teams: ["3D", "4D"], venue: "vancouver", group: "D", desc: "Australia vs UEFA playoff C" },
  { date: "2026-06-13", teams: ["3C", "4C"], venue: "boston", group: "C", desc: "Haiti vs Scotland" },
  { date: "2026-06-13", teams: ["3B", "4B"], venue: "san_francisco", group: "B", desc: "Qatar vs Switzerland" },
  
  { date: "2026-06-14", teams: ["1E", "2E"], venue: "houston", group: "E", desc: "Germany vs Curaçao" },
  { date: "2026-06-14", teams: ["3E", "4E"], venue: "philadelphia", group: "E", desc: "Ivory Coast vs Ecuador" },
  { date: "2026-06-14", teams: ["1F", "2F"], venue: "dallas", group: "F", desc: "Netherlands vs Japan" },
  { date: "2026-06-14", teams: ["3F", "4F"], venue: "monterrey", group: "F", desc: "UEFA playoff B vs Tunisia" },
  
  { date: "2026-06-15", teams: ["1H", "2H"], venue: "atlanta", group: "H", desc: "Spain vs Cape Verde" },
  { date: "2026-06-15", teams: ["3H", "4H"], venue: "miami", group: "H", desc: "Saudi Arabia vs Uruguay" },
  { date: "2026-06-15", teams: ["1G", "2G"], venue: "seattle", group: "G", desc: "Belgium vs Egypt" },
  { date: "2026-06-15", teams: ["3G", "4G"], venue: "los_angeles", group: "G", desc: "Iran vs New Zealand" },
  
  { date: "2026-06-16", teams: ["1I", "2I"], venue: "new_york", group: "I", desc: "France vs Senegal" },
  { date: "2026-06-16", teams: ["3I", "4I"], venue: "boston", group: "I", desc: "FIFA playoff 2 vs Norway" },
  { date: "2026-06-16", teams: ["1J", "2J"], venue: "kansas_city", group: "J", desc: "Argentina vs Algeria" },
  { date: "2026-06-16", teams: ["3J", "4J"], venue: "san_francisco", group: "J", desc: "Austria vs Jordan" },
  
  { date: "2026-06-17", teams: ["1L", "2L"], venue: "dallas", group: "L", desc: "England vs Croatia" },
  { date: "2026-06-17", teams: ["3L", "4L"], venue: "toronto", group: "L", desc: "Ghana vs Panama" },
  { date: "2026-06-17", teams: ["1K", "2K"], venue: "houston", group: "K", desc: "Portugal vs FIFA playoff 1" },
  { date: "2026-06-17", teams: ["3K", "4K"], venue: "mexico_city", group: "K", desc: "Uzbekistan vs Colombia" },
  
  { date: "2026-06-18", teams: ["4A", "2A"], venue: "atlanta", group: "A", desc: "UEFA playoff D vs South Africa" },
  { date: "2026-06-18", teams: ["4B", "2B"], venue: "los_angeles", group: "B", desc: "Switzerland vs UEFA playoff A" },
  { date: "2026-06-18", teams: ["1B", "3B"], venue: "vancouver", group: "B", desc: "Canada vs Qatar" },
  { date: "2026-06-18", teams: ["1A", "3A"], venue: "guadalajara", group: "A", desc: "Mexico vs South Korea" },
  
  { date: "2026-06-19", teams: ["1C", "3C"], venue: "philadelphia", group: "C", desc: "Brazil vs Haiti" },
  { date: "2026-06-19", teams: ["4C", "2C"], venue: "boston", group: "C", desc: "Scotland vs Morocco" },
  { date: "2026-06-19", teams: ["4D", "2D"], venue: "san_francisco", group: "D", desc: "UEFA playoff C vs Paraguay" },
  { date: "2026-06-19", teams: ["1D", "3D"], venue: "seattle", group: "D", desc: "USA vs Australia" },
  
  { date: "2026-06-20", teams: ["1E", "3E"], venue: "toronto", group: "E", desc: "Germany vs Ivory Coast" },
  { date: "2026-06-20", teams: ["4E", "2E"], venue: "kansas_city", group: "E", desc: "Ecuador vs Curaçao" },
  { date: "2026-06-20", teams: ["1F", "3F"], venue: "houston", group: "F", desc: "Netherlands vs UEFA playoff B" },
  { date: "2026-06-20", teams: ["4F", "2F"], venue: "monterrey", group: "F", desc: "Tunisia vs Japan" },
  
  { date: "2026-06-21", teams: ["1H", "3H"], venue: "atlanta", group: "H", desc: "Spain vs Saudi Arabia" },
  { date: "2026-06-21", teams: ["4H", "2H"], venue: "miami", group: "H", desc: "Uruguay vs Cape Verde" },
  { date: "2026-06-21", teams: ["1G", "3G"], venue: "los_angeles", group: "G", desc: "Belgium vs Iran" },
  { date: "2026-06-21", teams: ["4G", "2G"], venue: "vancouver", group: "G", desc: "New Zealand vs Egypt" },
  
  { date: "2026-06-22", teams: ["1I", "3I"], venue: "philadelphia", group: "I", desc: "France vs FIFA playoff 2" },
  { date: "2026-06-22", teams: ["4I", "2I"], venue: "new_york", group: "I", desc: "Norway vs Senegal" },
  { date: "2026-06-22", teams: ["1J", "3J"], venue: "dallas", group: "J", desc: "Argentina vs Austria" },
  { date: "2026-06-22", teams: ["4J", "2J"], venue: "san_francisco", group: "J", desc: "Jordan vs Algeria" },
  
  { date: "2026-06-23", teams: ["1L", "3L"], venue: "boston", group: "L", desc: "England vs Ghana" },
  { date: "2026-06-23", teams: ["4L", "2L"], venue: "toronto", group: "L", desc: "Panama vs Croatia" },
  { date: "2026-06-23", teams: ["1K", "3K"], venue: "houston", group: "K", desc: "Portugal vs Uzbekistan" },
  { date: "2026-06-23", teams: ["4K", "2K"], venue: "guadalajara", group: "K", desc: "Colombia vs FIFA playoff 1" },
  
  { date: "2026-06-24", teams: ["4C", "1C"], venue: "miami", group: "C", desc: "Scotland vs Brazil" },
  { date: "2026-06-24", teams: ["2C", "3C"], venue: "atlanta", group: "C", desc: "Morocco vs Haiti" },
  { date: "2026-06-24", teams: ["1B", "4B"], venue: "vancouver", group: "B", desc: "Canada vs Switzerland" },
  { date: "2026-06-24", teams: ["2B", "3B"], venue: "seattle", group: "B", desc: "UEFA playoff A vs Qatar" },
  { date: "2026-06-24", teams: ["1A", "4A"], venue: "mexico_city", group: "A", desc: "Mexico vs UEFA playoff D" },
  { date: "2026-06-24", teams: ["3A", "2A"], venue: "monterrey", group: "A", desc: "South Korea vs South Africa" },
  
  { date: "2026-06-25", teams: ["4E", "1E"], venue: "new_york", group: "E", desc: "Ecuador vs Germany" },
  { date: "2026-06-25", teams: ["2E", "3E"], venue: "philadelphia", group: "E", desc: "Curaçao vs Ivory Coast" },
  { date: "2026-06-25", teams: ["4F", "1F"], venue: "kansas_city", group: "F", desc: "Tunisia vs Netherlands" },
  { date: "2026-06-25", teams: ["2F", "3F"], venue: "dallas", group: "F", desc: "Japan vs UEFA playoff B" },
  { date: "2026-06-25", teams: ["1D", "4D"], venue: "los_angeles", group: "D", desc: "USA vs UEFA playoff C" },
  { date: "2026-06-25", teams: ["2D", "3D"], venue: "san_francisco", group: "D", desc: "Paraguay vs Australia" },
  
  { date: "2026-06-26", teams: ["4I", "1I"], venue: "boston", group: "I", desc: "Norway vs France" },
  { date: "2026-06-26", teams: ["2I", "3I"], venue: "toronto", group: "I", desc: "Senegal vs FIFA playoff 2" },
  { date: "2026-06-26", teams: ["4G", "1G"], venue: "vancouver", group: "G", desc: "New Zealand vs Belgium" },
  { date: "2026-06-26", teams: ["2G", "3G"], venue: "seattle", group: "G", desc: "Egypt vs Iran" },
  { date: "2026-06-26", teams: ["4H", "1H"], venue: "guadalajara", group: "H", desc: "Uruguay vs Spain" },
  { date: "2026-06-26", teams: ["2H", "3H"], venue: "houston", group: "H", desc: "Cape Verde vs Saudi Arabia" },
  
  { date: "2026-06-27", teams: ["4L", "1L"], venue: "new_york", group: "L", desc: "Panama vs England" },
  { date: "2026-06-27", teams: ["2L", "3L"], venue: "philadelphia", group: "L", desc: "Croatia vs Ghana" },
  { date: "2026-06-27", teams: ["4J", "1J"], venue: "dallas", group: "J", desc: "Jordan vs Argentina" },
  { date: "2026-06-27", teams: ["2J", "3J"], venue: "kansas_city", group: "J", desc: "Algeria vs Austria" },
  { date: "2026-06-27", teams: ["4K", "1K"], venue: "miami", group: "K", desc: "Colombia vs Portugal" },
  { date: "2026-06-27", teams: ["2K", "3K"], venue: "atlanta", group: "K", desc: "FIFA playoff 1 vs Uzbekistan" },
];

function normalizeTeams(teams) {
  return [...teams].sort().join(',');
}

// Compare each match in our data against official schedule
const groupStageMatches = matchesData.rounds.groupStage.matches;

console.log('=== SCHEDULE COMPARISON ===\n');

const issues = [];
const verified = [];

for (const dataMatch of groupStageMatches) {
  const dataTeams = normalizeTeams(dataMatch.teams);
  
  const official = officialSchedule.find(o => 
    normalizeTeams(o.teams) === dataTeams
  );
  
  if (!official) {
    issues.push({
      matchId: dataMatch.id,
      type: 'NO_MATCH',
      message: `No matching official match found for teams ${dataMatch.teams.join(' vs ')}`
    });
    continue;
  }
  
  let hasIssue = false;
  
  if (dataMatch.date !== official.date) {
    issues.push({
      matchId: dataMatch.id,
      type: 'DATE_MISMATCH',
      message: `Date mismatch: Data has ${dataMatch.date}, Official has ${official.date}`,
      desc: official.desc
    });
    hasIssue = true;
  }
  
  if (dataMatch.venue !== official.venue) {
    issues.push({
      matchId: dataMatch.id,
      type: 'VENUE_MISMATCH',
      message: `Venue mismatch: Data has ${dataMatch.venue}, Official has ${official.venue}`,
      desc: official.desc
    });
    hasIssue = true;
  }
  
  if (dataMatch.group !== official.group) {
    issues.push({
      matchId: dataMatch.id,
      type: 'GROUP_MISMATCH',
      message: `Group mismatch: Data has ${dataMatch.group}, Official has ${official.group}`,
      desc: official.desc
    });
    hasIssue = true;
  }
  
  if (!hasIssue) {
    verified.push(dataMatch.id);
  }
}

if (issues.length === 0) {
  console.log('✅ All group stage matches match the official schedule!');
  console.log(`   Verified ${verified.length} matches.\n`);
} else {
  console.log(`❌ Found ${issues.length} discrepancies:\n`);
  
  for (const issue of issues) {
    console.log(`Match ${issue.matchId}: ${issue.type}`);
    console.log(`  ${issue.message}`);
    if (issue.desc) {
      console.log(`  Official match: ${issue.desc}`);
    }
    console.log();
  }
}

// === Matchup Rules Verification ===
console.log('=== MATCHUP RULES VERIFICATION ===\n');

// Expected matchups for each group (based on FIFA rules)
// Matchday 1: 1 vs 2, 3 vs 4
// Matchday 2: 1 vs 3, 4 vs 2
// Matchday 3: 4 vs 1, 2 vs 3
const expectedMatchups = [
  ['1', '2'], // 1 vs 2
  ['3', '4'], // 3 vs 4
  ['1', '3'], // 1 vs 3
  ['4', '2'], // 4 vs 2
  ['4', '1'], // 4 vs 1
  ['2', '3']  // 2 vs 3
];

const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const matchupIssues = [];

for (const group of groups) {
  const groupMatches = groupStageMatches.filter(m => m.group === group);
  
  // Check total matches
  if (groupMatches.length !== 6) {
    matchupIssues.push({
      group,
      type: 'WRONG_MATCH_COUNT',
      message: `Group ${group} has ${groupMatches.length} matches, expected 6`
    });
    continue;
  }
  
  // Verify all expected matchups exist
  for (const [pos1, pos2] of expectedMatchups) {
    const matchupTeams = [`${group}${pos1}`, `${group}${pos2}`].sort().join(',');
    const found = groupMatches.find(m => {
      const teams = [...m.teams].map(t => t.replace(/^([A-L])/, '$1')).sort().join(',');
      // Handle both formats: "A1" and "1A"
      const normalizedTeams = m.teams.map(t => {
        if (t.match(/^[A-L][1-4]$/)) return t;
        if (t.match(/^[1-4][A-L]$/)) return t[1] + t[0];
        return t;
      }).sort().join(',');
      return normalizedTeams === matchupTeams;
    });
    
    if (!found) {
      matchupIssues.push({
        group,
        type: 'MISSING_MATCHUP',
        message: `Group ${group} missing matchup: ${pos1} vs ${pos2}`
      });
    }
  }
  
  // Check for duplicate matchups
  const seenMatchups = new Set();
  for (const match of groupMatches) {
    const matchupKey = [...match.teams].sort().join(',');
    if (seenMatchups.has(matchupKey)) {
      matchupIssues.push({
        group,
        type: 'DUPLICATE_MATCHUP',
        message: `Group ${group} has duplicate matchup: ${match.teams.join(' vs ')}`
      });
    }
    seenMatchups.add(matchupKey);
  }
}

if (matchupIssues.length === 0) {
  console.log('✅ All groups have correct matchup structure!\n');
} else {
  console.log(`❌ Found ${matchupIssues.length} matchup issues:\n`);
  for (const issue of matchupIssues) {
    console.log(`Group ${issue.group}: ${issue.type}`);
    console.log(`  ${issue.message}\n`);
  }
}

// === Path to Final Verification ===
console.log('=== PATH TO FINAL VERIFICATION ===\n');

const groupsData = JSON.parse(fs.readFileSync('./data/groups.json', 'utf8'));
const pathIssues = [];

// For each team, verify they have a complete path for each group placement
for (const [groupLetter, groupData] of Object.entries(groupsData.groups)) {
  for (const team of groupData.teams) {
    const teamName = team.name;
    const position = team.position;
    
    // Check paths for finishing 1st, 2nd, and 3rd
    for (const finish of [1, 2, 3]) {
      const teamDesignation = `${finish}${groupLetter}`;
      
      // Find R32 match for this designation
      const r32Matches = matchesData.rounds.roundOf32.matches;
      let r32Match = null;
      
      if (finish === 1 || finish === 2) {
        r32Match = r32Matches.find(m => m.teams.includes(teamDesignation));
      } else if (finish === 3) {
        // Third place can go to multiple possible slots
        r32Match = r32Matches.find(m => 
          m.teams.some(t => t.startsWith('3') && t.length > 2 && t.includes(groupLetter))
        );
      }
      
      if (!r32Match) {
        pathIssues.push({
          team: teamName,
          group: groupLetter,
          finish,
          type: 'NO_R32_MATCH',
          message: `${teamName} (${teamDesignation}) has no Round of 32 match`
        });
        continue;
      }
      
      // Trace the path forward (verify knockout bracket connectivity)
      // R32 -> R16 -> QF -> SF -> Final
      const rounds = ['roundOf16', 'quarterFinals', 'semiFinals', 'final'];
      let currentMatchId = r32Match.id;
      let pathComplete = true;
      
      for (const round of rounds) {
        const roundMatches = matchesData.rounds[round].matches;
        const winnerRef = `W${currentMatchId.slice(1)}`;
        const nextMatch = roundMatches.find(m => m.teams.includes(winnerRef));
        
        if (!nextMatch) {
          pathIssues.push({
            team: teamName,
            group: groupLetter,
            finish,
            type: 'INCOMPLETE_PATH',
            message: `${teamName} (${teamDesignation}) path breaks at ${round} - no match references W${currentMatchId.slice(1)}`
          });
          pathComplete = false;
          break;
        }
        
        currentMatchId = nextMatch.id;
      }
      
      if (pathComplete && finish <= 2) {
        // Only log for 1st and 2nd to keep output manageable
        // console.log(`  ✓ ${teamName} finishing ${finish === 1 ? '1st' : finish === 2 ? '2nd' : '3rd'} has complete path to Final`);
      }
    }
  }
}

if (pathIssues.length === 0) {
  console.log('✅ All teams have complete paths to the Final for all placements!\n');
} else {
  console.log(`❌ Found ${pathIssues.length} path issues:\n`);
  for (const issue of pathIssues) {
    console.log(`${issue.team} (Group ${issue.group}, finishing ${issue.finish === 1 ? '1st' : issue.finish === 2 ? '2nd' : '3rd'}): ${issue.type}`);
    console.log(`  ${issue.message}\n`);
  }
}

// Summary
console.log('=== SUMMARY ===');
const scheduleOk = issues.length === 0;
const matchupsOk = matchupIssues.length === 0;
const pathsOk = pathIssues.length === 0;

if (scheduleOk && matchupsOk && pathsOk) {
  console.log('✅ All verifications passed!');
  process.exit(0);
} else {
  if (!scheduleOk) console.log(`❌ Schedule: ${issues.length} issues`);
  if (!matchupsOk) console.log(`❌ Matchups: ${matchupIssues.length} issues`);
  if (!pathsOk) console.log(`❌ Paths: ${pathIssues.length} issues`);
  process.exit(1);
}
