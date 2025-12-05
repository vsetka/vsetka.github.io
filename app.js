let groupsData = null;
let matchesData = null;
let translationsData = null;
let selectedTeam = null;
let selectedFinish = null;
let currentLang = 'en';

const countryFlags = {
  "Mexico": "🇲🇽",
  "South Africa": "🇿🇦",
  "South Korea": "🇰🇷",
  "Canada": "🇨🇦",
  "Qatar": "🇶🇦",
  "Switzerland": "🇨🇭",
  "Brazil": "🇧🇷",
  "Morocco": "🇲🇦",
  "Haiti": "🇭🇹",
  "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "USA": "🇺🇸",
  "Paraguay": "🇵🇾",
  "Australia": "🇦🇺",
  "Germany": "🇩🇪",
  "Curaçao": "🇨🇼",
  "Ivory Coast": "🇨🇮",
  "Ecuador": "🇪🇨",
  "Netherlands": "🇳🇱",
  "Japan": "🇯🇵",
  "Tunisia": "🇹🇳",
  "Belgium": "🇧🇪",
  "Egypt": "🇪🇬",
  "Iran": "🇮🇷",
  "New Zealand": "🇳🇿",
  "Spain": "🇪🇸",
  "Cape Verde": "🇨🇻",
  "Saudi Arabia": "🇸🇦",
  "Uruguay": "🇺🇾",
  "France": "🇫🇷",
  "Senegal": "🇸🇳",
  "Norway": "🇳🇴",
  "Argentina": "🇦🇷",
  "Algeria": "🇩🇿",
  "Austria": "🇦🇹",
  "Jordan": "🇯🇴",
  "Portugal": "🇵🇹",
  "Uzbekistan": "🇺🇿",
  "Colombia": "🇨🇴",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Croatia": "🇭🇷",
  "Ghana": "🇬🇭",
  "Panama": "🇵🇦",
  "TBD": "🏳️"
};

// I18n helper function
function t(key, params = {}) {
  const translations = translationsData?.translations[currentLang] || translationsData?.translations['en'] || {};
  let text = translations[key] || key;
  
  // Replace parameters like {team}, {group}, etc.
  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  });
  
  return text;
}

// Translate country name
function translateCountry(englishName) {
  const countries = translationsData?.translations[currentLang]?.countries || {};
  return countries[englishName] || englishName;
}

// Update all elements with data-i18n attribute
function updatePageTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  // Update HTML dir attribute for RTL languages
  const langConfig = translationsData?.languages[currentLang];
  document.documentElement.dir = langConfig?.rtl ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
  
  // Update page title
  document.title = `${t('appTitle')} - ${t('appSubtitle')}`;
}

async function init() {
  try {
    const [groupsResponse, matchesResponse, translationsResponse] = await Promise.all([
      fetch('data/groups.json'),
      fetch('data/matches.json'),
      fetch('data/translations.json')
    ]);
    
    groupsData = await groupsResponse.json();
    matchesData = await matchesResponse.json();
    translationsData = await translationsResponse.json();
    
    // Load saved language preference
    const savedLang = localStorage.getItem('fifa2026-lang');
    if (savedLang && translationsData.languages[savedLang]) {
      currentLang = savedLang;
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translationsData.languages[browserLang]) {
        currentLang = browserLang;
      }
    }
    
    populateLanguageSelector();
    updatePageTranslations();
    populateTeamSelector();
    setupEventListeners();
  } catch (error) {
    console.error('Failed to load data:', error);
  }
}

function populateLanguageSelector() {
  const dropdown = document.getElementById('lang-dropdown');
  const toggle = document.getElementById('lang-toggle');
  const currentFlag = document.getElementById('current-lang-flag');
  const currentCode = document.getElementById('current-lang-code');
  
  dropdown.innerHTML = '';
  
  Object.entries(translationsData.languages).forEach(([code, lang]) => {
    const option = document.createElement('button');
    option.className = `lang-option ${code === currentLang ? 'active' : ''}`;
    option.dataset.lang = code;
    option.innerHTML = `
      <span class="lang-flag">${lang.flag}</span>
      <span class="lang-native">${lang.native}</span>
    `;
    option.addEventListener('click', () => setLanguage(code));
    dropdown.appendChild(option);
  });
  
  // Update current language display
  const currentLangConfig = translationsData.languages[currentLang];
  currentFlag.textContent = currentLangConfig.flag;
  currentCode.textContent = currentLang.toUpperCase();
  
  // Toggle dropdown
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fifa2026-lang', lang);
  
  const currentFlag = document.getElementById('current-lang-flag');
  const currentCode = document.getElementById('current-lang-code');
  const dropdown = document.getElementById('lang-dropdown');
  
  const langConfig = translationsData.languages[lang];
  currentFlag.textContent = langConfig.flag;
  currentCode.textContent = lang.toUpperCase();
  
  // Update active state in dropdown
  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  
  dropdown.classList.remove('open');
  
  updatePageTranslations();
  
  // Preserve selected value and refresh team selector with translated names
  const select = document.getElementById('team-select');
  const selectedValue = select.value;
  populateTeamSelector();
  select.value = selectedValue;
  
  // Update team info display if a team is selected
  if (selectedTeam) {
    showTeamInfo(selectedTeam);
  }
  
  // Re-render paths if a team is selected
  if (selectedTeam && selectedFinish) {
    calculateAndShowPaths();
  }
}

function populateTeamSelector() {
  const select = document.getElementById('team-select');
  
  // Clear existing optgroups and options except the first option
  const firstOption = select.options[0];
  select.innerHTML = '';
  select.appendChild(firstOption);
  
  Object.entries(groupsData.groups).forEach(([groupLetter, groupData]) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = `${t('group')} ${groupLetter}`;
    
    groupData.teams
      .sort((a, b) => a.position > b.position)
      .forEach(team => {
        const option = document.createElement('option');
        option.value = `${groupLetter}-${team.position}`;
        const translatedName = translateCountry(team.name);
        option.textContent = `${countryFlags[team.name] || '🏳️'} ${translatedName}`;
        optgroup.appendChild(option);
      });
    
    select.appendChild(optgroup);
  });
}

function setupEventListeners() {
  const select = document.getElementById('team-select');
  select.addEventListener('change', handleTeamSelect);
  
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', handleScenarioSelect);
  });
}

function handleTeamSelect(e) {
  const value = e.target.value;
  
  if (!value) {
    hideTeamInfo();
    return;
  }
  
  const [group, position] = value.split('-');
  const team = groupsData.groups[group].teams.find(t => t.position === parseInt(position));
  
  selectedTeam = {
    name: team.name,
    pot: team.pot,
    group: group,
    position: parseInt(position)
  };
  
  showTeamInfo(selectedTeam);
  showScenarioSelector();
  clearPaths();
}

function showTeamInfo(team) {
  const teamInfo = document.getElementById('team-info');
  const teamFlag = document.getElementById('team-flag');
  const teamName = document.getElementById('selected-team-name');
  const teamGroup = document.getElementById('team-group');
  const teamPosition = document.getElementById('team-position');
  const teamPot = document.getElementById('team-pot');
  
  teamFlag.textContent = countryFlags[team.name] || '🏳️';
  teamName.textContent = translateCountry(team.name);
  teamGroup.textContent = team.group;
  teamPosition.textContent = `${team.position}`;
  teamPot.textContent = `${team.pot}`;
  
  teamInfo.classList.remove('hidden');
}

function hideTeamInfo() {
  document.getElementById('team-info').classList.add('hidden');
  document.getElementById('scenario-selector').classList.add('hidden');
  clearPaths();
}

function showScenarioSelector() {
  document.getElementById('scenario-selector').classList.remove('hidden');
  document.querySelectorAll('.scenario-btn').forEach(btn => btn.classList.remove('active'));
  selectedFinish = null;
}

function handleScenarioSelect(e) {
  const btn = e.currentTarget;
  const finish = parseInt(btn.dataset.finish);
  
  document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  selectedFinish = finish;
  calculateAndShowPaths();
}

function clearPaths() {
  document.getElementById('path-section').classList.add('hidden');
  document.getElementById('paths-container').innerHTML = '';
}

function calculateAndShowPaths() {
  if (!selectedTeam || !selectedFinish) return;
  
  const paths = calculatePaths(selectedTeam, selectedFinish);
  displayPaths(paths);
}

function calculatePaths(team, finish) {
  const group = team.group;
  const teamDesignation = `${finish}${group}`;
  
  const groupMatches = getGroupStageMatches(group, team.position);
  
  const r32Matches = findR32Matches(teamDesignation, finish);
  
  const paths = r32Matches.map(r32Match => {
    return tracePath(r32Match, groupMatches);
  });
  
  return {
    team: team,
    finish: finish,
    groupMatches: groupMatches,
    paths: paths,
    isThirdPlace: finish === 3
  };
}

function getGroupStageMatches(group, position) {
  const teamPos = `${position}${group}`;
  const matches = matchesData.rounds.groupStage.matches.filter(m => {
    return m.group === group && m.teams.includes(teamPos);
  });
  
  return matches.map(m => ({
    ...m,
    venuesList: m.venues.map(v => matchesData.venues[v])
  }));
}

function findR32Matches(teamDesignation, finish) {
  const r32Matches = matchesData.rounds.roundOf32.matches;
  const matches = [];
  const group = teamDesignation.slice(1);
  
  if (finish === 1 || finish === 2) {
    r32Matches.forEach(m => {
      if (m.teams.includes(teamDesignation)) {
        matches.push({
          ...m,
          venue: matchesData.venues[m.venue],
          matchType: 'definite'
        });
      }
    });
  } else if (finish === 3) {
    r32Matches.forEach(m => {
      m.teams.forEach(teamStr => {
        if (teamStr.startsWith('3') && teamStr.length > 2) {
          const possibleGroups = teamStr.slice(1).split('');
          if (possibleGroups.includes(group)) {
            matches.push({
              ...m,
              venue: matchesData.venues[m.venue],
              matchType: 'possible',
              slotId: teamStr,
              possibleGroups: possibleGroups
            });
          }
        }
      });
    });
  }
  
  return matches;
}

function tracePath(r32Match, groupMatches) {
  const path = {
    r32: r32Match,
    r16: null,
    quarter: null,
    semi: null,
    final: null
  };
  
  const matchId = r32Match.id;
  const winnerRef = `W${matchId.slice(1)}`;
  
  const r16Match = findMatchByWinner(matchesData.rounds.roundOf16.matches, winnerRef);
  if (r16Match) {
    path.r16 = {
      ...r16Match,
      venue: matchesData.venues[r16Match.venue]
    };
    
    const r16WinnerRef = `W${r16Match.id.slice(1)}`;
    const quarterMatch = findMatchByWinner(matchesData.rounds.quarterFinals.matches, r16WinnerRef);
    if (quarterMatch) {
      path.quarter = {
        ...quarterMatch,
        venue: matchesData.venues[quarterMatch.venue]
      };
      
      const quarterWinnerRef = `W${quarterMatch.id.slice(1)}`;
      const semiMatch = findMatchByWinner(matchesData.rounds.semiFinals.matches, quarterWinnerRef);
      if (semiMatch) {
        path.semi = {
          ...semiMatch,
          venue: matchesData.venues[semiMatch.venue]
        };
      }
    }
  }
  
  path.final = {
    ...matchesData.rounds.final.matches[0],
    venue: matchesData.venues[matchesData.rounds.final.matches[0].venue]
  };
  
  return path;
}

function findMatchByWinner(matches, winnerRef) {
  return matches.find(m => m.teams.includes(winnerRef));
}

function displayPaths(data) {
  const pathSection = document.getElementById('path-section');
  const container = document.getElementById('paths-container');
  const pathTeamName = document.getElementById('path-team-name');
  
  pathTeamName.textContent = translateCountry(data.team.name);
  container.innerHTML = '';
  
  const groupHtml = createGroupMatchesSummary(data.groupMatches);
  container.innerHTML += groupHtml;
  
  if (data.isThirdPlace) {
    const thirdPlaceHtml = createThirdPlaceNote(data.team.group, data.paths);
    container.innerHTML += thirdPlaceHtml;
  }
  
  data.paths.forEach((path, index) => {
    const pathHtml = createPathCard(path, index, data.paths.length, data.team);
    container.innerHTML += pathHtml;
  });
  
  pathSection.classList.remove('hidden');
  pathSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createGroupMatchesSummary(matches) {
  const matchItems = matches.map(m => {
    const team1English = getTeamName(m.teams[0]);
    const team2English = getTeamName(m.teams[1]);
    const team1 = translateCountry(team1English);
    const team2 = translateCountry(team2English);
    const flag1 = countryFlags[team1English] || '🏳️';
    const flag2 = countryFlags[team2English] || '🏳️';
    
    const venueNames = m.venuesList.map(v => v.name);
    const venueDisplay = venueNames.length > 1 
      ? venueNames.join(` ${t('or')} `) 
      : venueNames[0];
    const venueClass = venueNames.length > 1 ? 'venue uncertain' : 'venue';
    
    return `
      <div class="group-match-item">
        <span class="match-id">${m.id}</span>
        <span class="match-teams">${flag1} ${team1} ${t('vs')} ${flag2} ${team2}</span>
        <span class="${venueClass}">${venueDisplay}</span>
        <span class="date">${formatDate(m.date)}</span>
      </div>
    `;
  }).join('');
  
  return `
    <div class="group-matches-summary">
      <h4>${t('groupStageMatches')} (3 ${t('matches')})</h4>
      <div class="group-match-list">
        ${matchItems}
      </div>
    </div>
  `;
}

function createThirdPlaceNote(group, paths) {
  const slots = paths.map(p => `
    <span class="slot-badge">
      ${p.r32.slotId} → ${p.r32.venue.name}
    </span>
  `).join('');
  
  return `
    <div class="third-place-note">
      <h4>⚠️ ${t('thirdPlaceQualification')}</h4>
      <p>${t('thirdPlaceNote', { team: translateCountry(selectedTeam.name), group: group })}</p>
      <div class="possible-slots">
        ${slots}
      </div>
    </div>
  `;
}

function createPathCard(path, index, total, team) {
  const isThirdPlace = path.r32.matchType === 'possible';
  const pathTitle = isThirdPlace 
    ? t('pathVia', { num: index + 1, slot: path.r32.slotId })
    : t('knockoutPath');
  
  const pathNote = total > 1 
    ? t('possibleRoutes', { current: index + 1, total: total })
    : t('singleRoute');
  
  const matches = [];
  
  matches.push(createMatchCard(path.r32, t('roundOf32'), 'round-32', getOpponentInfo(path.r32, team)));
  
  if (path.r16) {
    matches.push(createMatchCard(path.r16, t('roundOf16'), 'round-16'));
  }
  
  if (path.quarter) {
    matches.push(createMatchCard(path.quarter, t('quarterFinal'), 'quarter'));
  }
  
  if (path.semi) {
    matches.push(createMatchCard(path.semi, t('semiFinal'), 'semi'));
  }
  
  if (path.final) {
    matches.push(createMatchCard(path.final, t('final'), 'final'));
  }
  
  const matchesWithArrows = matches.map((m, i) => {
    if (i < matches.length - 1) {
      return m + '<div class="match-arrow">→</div>';
    }
    return m;
  }).join('');
  
  return `
    <div class="path-card">
      <div class="path-header">
        <span class="path-title">${pathTitle}</span>
        <span class="path-note">${pathNote}</span>
      </div>
      <div class="match-timeline">
        ${matchesWithArrows}
      </div>
    </div>
  `;
}

function getOpponentInfo(match, team) {
  const teams = match.teams;
  const teamDesignation = `${selectedFinish}${team.group}`;
  
  let opponent = teams.find(t => t !== teamDesignation && !t.startsWith('3'));
  if (!opponent) {
    opponent = teams.find(t => t !== teamDesignation);
  }
  
  if (!opponent) return null;
  
  const opponentInfo = translateTeamDesignation(opponent);
  return opponentInfo;
}

function getTeamName(teamCode) {
  if (matchesData.teams && matchesData.teams[teamCode]) {
    return matchesData.teams[teamCode].name;
  }
  const position = parseInt(teamCode[0]);
  const group = teamCode.slice(1);
  if (groupsData.groups[group]) {
    const team = groupsData.groups[group].teams.find(t => t.position === position);
    if (team) return team.name;
  }
  return teamCode;
}

function translateTeamDesignation(designation) {
  if (designation.startsWith('3') && designation.length > 2) {
    const groups = designation.slice(1).split('');
    return t('thirdPlaceFrom', { groups: groups.join('/') });
  }
  
  const position = parseInt(designation[0]);
  const group = designation.slice(1);
  
  const teamCode = `${position}${group}`;
  if (matchesData.teams && matchesData.teams[teamCode]) {
    const teamNameEnglish = matchesData.teams[teamCode].name;
    const teamName = translateCountry(teamNameEnglish);
    const flag = countryFlags[teamNameEnglish] || '🏳️';
    return `${flag} ${teamName}`;
  }
  
  if (groupsData.groups[group]) {
    const team = groupsData.groups[group].teams.find(t => t.position === position);
    if (team && team.name !== 'TBD') {
      const flag = countryFlags[team.name] || '🏳️';
      const translatedName = translateCountry(team.name);
      return `${flag} ${translatedName}`;
    }
    const positionLabel = position === 1 ? t('first') : position === 2 ? t('second') : t('third');
    return `${positionLabel} ${t('group')} ${group}`;
  }
  
  return designation;
}

function createMatchCard(match, round, cssClass, opponentInfo = null) {
  const opponentHtml = opponentInfo 
    ? `<div class="match-opponent">${t('vs')} <strong>${opponentInfo}</strong></div>` 
    : '';
  
  return `
    <div class="match-card ${cssClass}">
      <div class="match-round">${round}</div>
      <div class="match-id">${match.id}</div>
      <div class="match-date">${formatDate(match.date)}</div>
      <div class="match-venue">${match.venue.name}</div>
      ${opponentHtml}
    </div>
  `;
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00Z');
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  
  const months = translationsData?.translations[currentLang]?.months?.short 
    || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return `${months[monthIndex]} ${day}`;
}

document.addEventListener('DOMContentLoaded', init);
