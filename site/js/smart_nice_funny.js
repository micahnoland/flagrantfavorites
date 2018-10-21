var teams = [
	{ name: "San Antonio Spurs", code: "SAS", funny: false, shortName: "spurs" },
	{ name: "Boston Celtics", code: "BOS", funny: false, shortName: "celtics" },
	{ name: "Brooklyn Nets", code: "BKN", funny: true, shortName: "nets" },
	{ name: "New York Knicks", code: "NYK", funny: false, shortName: "knicks" },
	{ name: "Philadelphia 76ers", code: "PHI", funny: true, shortName: "sixers" },
	{ name: "Toronto Raptors", code: "TOR", funny: true, shortName: "raptors" },
	{ name: "Chicago Bulls", code: "CHI", funny: false, shortName: "bulls" },
	{ name: "Cleveland Cavaliers", code: "CLE", funny: true, shortName: "cavaliers" },
	{ name: "Detroit Pistons", code: "DET", funny: true, shortName: "pistons" },
	{ name: "Indiana Pacers", code: "IND", funny: true, shortName: "pacers" },
	{ name: "Milwaukee Bucks", code: "MIL", funny: true, shortName: "bucks" },
	{ name: "Atlanta Hawks", code: "ATL", funny: true, shortName: "hawks" },
	{ name: "Charlotte Hornets", code: "CHA", funny: true, shortName: "hornets" },
	{ name: "Miami Heat", code: "MIA", funny: true, shortName: "heat" },
	{ name: "Orlando Magic", code: "ORL", funny: true, shortName: "magic" },
	{ name: "Washington Wizards", code: "WAS", funny: true, shortName: "wizards" },
	{ name: "Denver Nuggets", code: "DEN", funny: true, shortName: "nuggets" },
	{ name: "Minnesota Timberwolves", code: "MIN", funny: true, shortName: "timberwolves" },
	{ name: "Oklahoma City Thunder", code: "OKC", funny: false, shortName: "thunder" },
	{ name: "Portland Trail Blazers", code: "POR", funny: true, shortName: "blazers" },
	{ name: "Utah Jazz", code: "UTA", funny: true, shortName: "jazz" },
	{ name: "Golden State Warriors", code: "GSW", funny: false, shortName: "warriors" },
	{ name: "Los Angeles Clippers", code: "LAC", funny: false, shortName: "clippers" },
	{ name: "Los Angeles Lakers", code: "LAL", funny: false, shortName: "lakers" },
	{ name: "Phoenix Suns", code: "PHX", funny: true, shortName: "suns" },
	{ name: "Sacramento Kings", code: "SAC", funny: true, shortName: "kings" },
	{ name: "Dallas Mavericks", code: "DAL", funny: true, shortName: "mavericks" },
	{ name: "Houston Rockets", code: "HOU", funny: true, shortName: "rockets" },
	{ name: "Memphis Grizzlies", code: "MEM", funny: true, shortName: "grizzlies" },
	{ name: "New Orleans Pelicans", code: "NOP", funny: true, shortName: "pelicans" }
];
var onlyFunnyPlayersSorry = {
  "DeAndre Jordan": false,
  "Klay Thompson": false,
  "Kyrie Irving": false,
  "Jonathan Issac": false,
  "Taurean Prince": false,
  "Trae Young": false,
  "Jaylen Brown": false,
  "Jayson Tatum": false,
  "Rondae Hollis-Jefferson": false,
  "Caris LeVert": false,
  "Kemba Walker": false,
  "Miles Bridges": false,
  "Lauri Markkanen": false,
  "Wendell Carter Jr.": false,
  "Kevin Love": false,
  "Collin Sexton": false,
  "Dennis Smith Jr.": false,
  "Luka Doncic": false,
  "Jamal Murray": false,
  "Nikola Jokic": false,
  "Andre Drummond": false,
  "Blake Griffin": false,
  "Stephen Curry": false,
  "Kevin Durant": false,
  "James Harden": false,
  "Chris Paul": false,
  "Myles Turner": false,
  "Victor Oladipo": false,
  "Myles Turner": false,
  "Tobias Harris": false,
  "Shai Gilgeous-Alexander": false,
  "Brandon Ingram": false,
  "LeBron James": false,
  "Marc Gasol": false,
  "Jaren Jackson Jr.": false,
  "Justise Winslow": false,
  "Bam Adebayo": false,
  "Giannis Antetokounmpo": false,
  "Khris Middleton": false,
  "Karl-Anthony Towns": false,
  "Jimmy Butler": false,
  "Anthony Davis": false,
  "Julius Randle": false,
  "Kristaps Porzingis": false,
  "Kevin Knox": false,
  "Russell Westbrook": false,
  "Paul George": false,
  "Mohamed Bamba": false,
  "Aaron Gordon": false,
  "Joel Embiid": false,
  "Ben Simmons": false,
  "Deandre Ayton": false,
  "Devin Booker": false,
  "Damian Lillard": false,
  "CJ McCollum": false,
  "De'Aaron Fox": false,
  "Marvin Bagley III": false,
  "LaMarcus Aldridge": false,
  "DeMar DeRozan": false,
  "Kawhi Leonard": false,
  "OG Anunoby": false,
  "Rudy Gobert": false,
  "Donovan Mitchell": false,
  "John Wall": false,
  "Bradley Beal": false
};

var allPlayers = [];
var favteam, favplayer;
var favteamPick, favplayerPick;

const playerPicPrefix = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/';

$(document).ready(
  function () {
    $('#loading').hide();
    const loadTeamImagesPromise = loadTeamImages().then(() => {
      favteam = $('#favteam').slotMachine({
        active: 0,
        randomize() {
          return pickTeam();
        }
      });
    });

    const loadPlayersPromise = loadPlayers().then(() => {
      favplayer = $('#favplayer').slotMachine({
        active: 0,
        randomize() {
          return 1;
        }
      });
    });

    Promise.all([loadTeamImagesPromise, loadPlayersPromise]).then(() => {
      $('#letsgo').on('click', function (event) {
        clearFavTexts();
        pickPlayer().then(() => {
          roll();
          event.preventDefault();
        });
      });
    });
  });

function roll() {
  favplayer.prev();
  Promise.all([rollTeam(), rollPlayer()]).then(() => {
    updateTweetButton(favteamPick.name, favplayerPick[2]);
  });
}

function rollTeam() {
  return new Promise(resolve => {
    favteam.shuffle(5, function () {
      setFavTeamText(favteamPick);
      resolve();
    });
  });
}

function rollPlayer() {
  return new Promise(resolve => {
    setTimeout(() => favplayer.shuffle(5, function () {
      setFavPlayerText(favplayerPick);
      resolve();
    }), 500);
  });
}

function clearFavTexts() {
  $('#favteamname').fadeOut('fast', function () {
    $(this).empty();
  });

  $('#favplayername').fadeOut('fast', function () {
    $(this).empty();
  });

  $('#tweet').fadeOut('fast', function () {
    $(this).empty();
  });
}

function setFavTeamText(favteamPick) {
  var anchor = $('<a>', {
    text: 'The ' + favteamPick.name + '!',
    href: 'http://www.nba.com/teams/' + favteamPick.shortName
  });
  const favteamname = $('#favteamname');
  favteamname.append(anchor);
  favteamname.fadeIn(500);
}

function setFavPlayerText(favplayerPick) {
  var anchor = $('<a>', {
    text: favplayerPick[2] + '!',
    href: 'https://stats.nba.com/player/' + favplayerPick[0]
  });
  const favplayername = $('#favplayername');
  favplayername.append(anchor);
  favplayername.fadeIn(500);
}

function loadTeamImages() {
  return new Promise(resolve => {
    teams.forEach(function (team) {
      $('#favteam').append($('<img>', {
        class: 'team',
        src: 'https://www.nba.com/assets/logos/teams/secondary/web/' + team.code + '.svg#' + team.code + '(viewBox(0, 0, 250, 250))'
      }));
    });
    resolve();
  });
}

function loadPlayers() {
  return new Promise(resolve => {
    fetchPlayers().done(handlePlayers).then(resolve);
  });
}

function getRandomSubarray(arr, size) {
  return new Promise(resolve => {
    var shuffled = arr.slice(0),
      i = arr.length,
      temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    resolve(shuffled.slice(0, size));
  });
}

function pickTeam() {
  var teamPickIndex = getRandomTeamIndex();
  while (teams[teamPickIndex].funny === false) {
    teamPickIndex = getRandomTeamIndex();
  }
  favteamPick = teams[teamPickIndex];
  return teamPickIndex + 1;
}

function getRandomTeamIndex() {
  return Math.floor(Math.random() * teams.length);
}

function pickPlayer() {
  return new Promise(resolve => {
    var secretPick = getRandomPlayer();
    while (onlyFunnyPlayersSorry[secretPick[2]] === false) {
      secretPick = getRandomPlayer();
    }
    var nextRandom = getRandomPlayer();
    $('.slotMachineContainer .player:nth-child(3)').attr('src', playerPicPrefix + secretPick[0] + ".png");
    $('.slotMachineContainer .player:nth-child(6)').attr('src', playerPicPrefix + nextRandom[0] + ".png");
    favplayerPick = secretPick;
    resolve();
  });
}

function getRandomPlayer() {
  return allPlayers[Math.floor(Math.random() * allPlayers.length)];
}

function fetchPlayers() {
  var year = new Date().getFullYear();
  var nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getFullYear().toString().substr(-2);
  var url = 'https://stats.nba.com/stats/commonallplayers?LeagueID=00&IsOnlyCurrentSeason=1&Season=' + year + '-' + nextYear;
  return $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp'
  });
}

function handlePlayers(response) {
  return new Promise(resolve => {
    response.resultSets.forEach((resultSet) => {
      resultSet.rowSet.forEach((rowSet) => {
        allPlayers.push(rowSet);
      });
    });
    getRandomSubarray(allPlayers, 30).then(loadCandidates).then(resolve);
  });
}

function loadCandidates(candidates) {
  return new Promise(resolve => {
    candidates.forEach((candidate) => {
      const imageUrl = playerPicPrefix + candidate[0] + '.png';
      $('#favplayer').append($('<img>', {
        class: 'player',
        src: imageUrl,
        onerror: 'this.onerror=null;this.src="img/notfound.png";'
      }));
    });
    resolve();
  });
}

function updateTweetButton(team, player) {
  var message = 'My new favorite NBA team is The ' + team + ' and my new favorite player is ' + player + '! ';
  var tweetButton = $('<a>', {
    href: 'https://twitter.com/intent/tweet?text=' + message + '&url=https://flagrantfavorites.com&hashtags=TheFlagrantOnes',
    class: 'btn btn-twitter twitter-share-button',
  }).text(' Tweet your new favorite team and player!');
  var icon = $('<i>', {
    class: 'fa fa-twitter'
  });
  tweetButton.prepend(icon);
  tweetButton.attr('data-show-count', 'false');
  tweetButton.attr('data-size', 'large');
  $('#tweet').append(tweetButton);
  $('#tweet').fadeIn();
}
