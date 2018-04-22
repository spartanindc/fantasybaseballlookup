//Variables

const MLB_STATS_URL = "https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular/cumulative_player_stats.json?";

const statTrans = new Map([["R", "Runs"],
                          ["RBI", "RunsBattedIn"],
                          ["HR", "Homeruns"],
						  ["SB", "StolenBases"],
						  ["AVG", "BattingAvg"],
						  ["ERA", "EarnedRunsAllowed"],
						  ["W", "Wins"],
						  ["SV", "Saves"],
						  ["WHIP", "WalksandHitsPerInningPitched"],
						  ["SO", "PitcherStrikeouts"]]);

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
		<h2>Results</h2>	
		<table id='resultTable'>
				<tr>
					<th>Name</th>
					<th>Stat</th>
				</tr>
			</table>`)
}

function submitButtonClicked() {
	$('.submitButton').on('click', event => {
		event.preventDefault();
		$('.results').removeAttr('hidden');
		resetResults();
		getMLBData();	
		$('.results').show();
	});
}

function displayTools() {
	$('.startText').remove();
	renderStatsPage();
	submitButtonClicked();
}

function displayResults(data) {
	
	let statAbbr = $('#pit').val(); 
		if ($('#pos').val() != 'P') {
			statAbbr = $('#hit').val();
		}
	let statName = statTrans.get(statAbbr);
	let players = data.cumulativeplayerstats.playerstatsentry;
	let tableResults = "";
	
	for (i=0; i < players.length; i++) {
		player = players[i].player;
		tableResults += "<tr>" +
						"<td>" + player.FirstName + " " + player.LastName + "</td>" +
						"<td>" + players[i].stats[statName]["#text"] + " " + statAbbr + "</td>" +
						"</tr>";
	}
	
	$('#resultTable').append(tableResults);
}

function displayError(data) {
	console.log('Something went wrong');
}

function renderStatsPage() {
	//display the search form, hide the results box until submit button clicked
	$('#inputOutput').removeAttr('hidden');
	$('.results').hide();
}

//API Call

function getMLBData() {
	
	let statAbbr = $('#pit').val(); 
		if ($('#pos').val() != 'P') {
			statAbbr = $('#hit').val();
		};
	
	let sortDecider = ""
		if ($('#pos').val() == 'P' && $('#pit').val() == 'ERA' || $('#pos').val() == 'P' && $('#pit').val() == 'WHIP') {
			sortDecider = ".A"
			} else {
				sortDecider = ".D"};
	
	let playerPosition = ""
		if ($('#pos').val() == 'OF') {
			playerPosition = 'OF,LF,CF,RF'
		} else {
			playerPosition = $('#pos').val()
		};
	
	let settings = {
	type: 'GET',
	headers: {
		"Authorization": 'Basic c3BhcnRhbmluZGM6RnRCMDUyMDAy'
		},
	url: MLB_STATS_URL,
	dataType: 'json',
	data: {
		position: playerPosition,
		playerstats: statAbbr,
		limit: 20,
		sort: "stats." + statAbbr + sortDecider,
		},
	crossDomain: true,
	success: displayResults,
	error: displayError,
	};
		
	$.ajax(settings);
}

//Run the page

letsGoButtonClicked();