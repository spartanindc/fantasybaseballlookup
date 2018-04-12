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

function submitButtonClicked() {
	$('.submitButton').on('click', event => {
		event.preventDefault();
		getMLBData();
		displayResults();
	});
}

function displayTools() {
	$('.startText').remove();
	renderStatsPage();
	submitButtonClicked();
}

function displayResults() {
	$('.results').removeAttr('hidden')
	console.log(getMLBData);
}

function displayError() {
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
			}
					
	let settings = {
	type: 'GET',
	headers: {
		"Authorization": 'Basic ' + 'btoa(c3BhcnRhbmluZGM6RnRCMDUyMDAy)'
		},
	url: MLB_STATS_URL,
	data: {
		position: $('#pos').val(),
		playerstats: chosenStats,
		limit: 20,
		sort: stats.chosenStats.D,
		},
	crossDomain: true,
	success: displayResults(),
	error: displayError(),
	};
		
	$.ajax(settings);
}

//Run the page

letsGoButtonClicked();