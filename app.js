//Variables

const MLB_STATS_URL = "https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular/cumulative_player_stats.json?";

//Landing Page

function letsGoButtonClicked() {
	$('.startButton').on('click', event => {
		event.preventDefault();
		displayTools();
	});
}

//Main Page Render & Display

function resetResults() {
	$('.results').html(`
	<ul class='resultsList'>Results</ul>`)
}

function submitButtonClicked() {
	$('.submitButton').on('click', event => {
		event.preventDefault();
		$('.results').removeAttr('hidden');
		resetResults();
		getMLBData();	
	});
}

function displayTools() {
	$('.startText').remove();
	renderStatsPage();
	submitButtonClicked();
}

function displayResults(data) {
	
	let chosenStats = $('#pit').val(); 
		if ($('#pos').val() != 'P') {
			chosenStats = $('#hit').val();
		};
	
	let pickedStat = ''
		if (chosenStats === "R") {
			pickedStat = "Runs"
		} else if (chosenStats == "RBI") {
			pickedStat = "RunsBattedIn"
		} else if (chosenStats === "HR") {
			pickedStat = "HomeRuns"
		} else if (chosenStats === "SB") {
			pickedStat = "StolenBases"
		} else if (chosenStats === "AVG") {
			pickedStat = "BattingAvg"
		} else if (chosenStats === "ERA") {
			pickedStat = "EarnedRunsAllowed"
		} else if (chosenStats === "W") {
			pickedStat = "Wins"
		} else if (chosenStats === "SV") {
			pickedStat = "Saves"
		} else if (chosenStats === "WHIP") {
			pickedStat = "WalksAndHitsPerInningPitched"
		} else {
			pickedStat = "PitcherStrikeouts"
		};
	
	let players = data.cumulativeplayerstats.playerstatsentry;

	let resultsString = "";
	
	for (i = 0; i < players.length; i++) {
		resultsString += "<li>" + players[i].player.FirstName + " " + players[i].player.LastName + " has " + players[i].stats.pickedStat["#text"] + " " + chosenStats + " so far this year</li>";
		}
	
	$('.results').append(resultsString);
	console.log(data);
	
}

function displayError(data) {
	console.log('Something went wrong');
}

function renderStatsPage() {
	//display the search form and results box
	$('#inputOutput').removeAttr('hidden');
}

//API Calls


function getMLBData() {
	
	let chosenStats = $('#pit').val(); 
		if ($('#pos').val() != 'P') {
			chosenStats = $('#hit').val();
		};
	
	let settings = {
	type: 'GET',
	headers: {
		"Authorization": 'Basic c3BhcnRhbmluZGM6RnRCMDUyMDAy'
		},
	url: MLB_STATS_URL,
	dataType: 'json',
	data: {
		position: $('#pos').val(),
		playerstats: chosenStats,
		limit: 20,
		sort: "stats." + chosenStats + ".D",
		},
	crossDomain: true,
	success: displayResults,
	error: displayError,
	};
		
	$.ajax(settings);
}

//Run the page

letsGoButtonClicked();