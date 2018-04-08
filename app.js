//Variables

const MLB_STATS_URL = "https://api.mysportsfeeds.com/v1.1/pull/mlb/2018-regular/cumulative_player_stats.json?";


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
		//API Call function
		//Display result function
	});
}

function displayTools() {
	$('.startText').remove();
	buildStatsPage();
	submitButtonClicked();
}

function buildStatsPage() {
	//display the search form and results box
	$('main').html(`
		<section role="region">
			<div class="input box">
				<form>
					<fieldset>
						<legend>Enter your Parameters</legend>

						<select name="position">
							<option value="C">Catcher</option>
							<option value="1B">First Base</option>
							<option value="2B">Second Base</option>
							<option value="3B">Third Base</option>
							<option value="SS">Shortstop</option>
							<option value="OF">Outfielder</option>
							<option value="P">Pitcher</option>
						 </select>
						<br>
						<select name="hitting_stats">
							<option value="R">Runs</option>
							<option value="RBI">RBI</option>
							<option value="HR">Home Runs</option>
							<option value="SB">Steals</option>
							<option value="AVG">Average</option>
						</select>
						<br>
						<select name="pitching_stats">
							<option value="W">Wins</option>
							<option value="ERA">ERA</option>
							<option value="SV">Saves</option>
							<option value="WHIP">WHIP</option>
							<option value="SO">Strikeouts</option>
						</select>
						<br>
						<button type="submit" class="submitButton">Submit</button>
					</fieldset>
				</form>
			</div>
			<div class="results box" hidden><p>This is the results box<p></div>
		</section>`);
}

//API Calls

let settings = {
	url: MLB_STATS_URL,
	Authorization: Basic c3BhcnRhbmluZGM6RnRCMDUyMDAy,
	
};

function getMLBData() {
	$.getJSON(settings);
}

//Run the page

letsGoButtonClicked();