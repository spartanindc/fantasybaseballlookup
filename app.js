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
					<th>First Name</th>
					<th>Last Name</th>
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
						"<th>" + player.FirstName + "</th>" +
						"<th>" + player.LastName + "</th>" +
						"<th>" + players[i].stats[statName]["#text"] + " " + statAbbr + "</th>" +
						"</tr>";
	}
	
	$('#resultTable').append(tableResults);
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
	
	let statAbbr = $('#pit').val(); 
		if ($('#pos').val() != 'P') {
			statAbbr = $('#hit').val();
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
		playerstats: statAbbr,
		limit: 20,
		sort: "stats." + statAbbr + ".D",
		},
	crossDomain: true,
	success: displayResults,
	error: displayError,
	};
		
	$.ajax(settings);
}

//Run the page

letsGoButtonClicked();