//Landing Page

function letsGoButtonClicked() {
	$('.startButton').on('click', event => {
		event.preventDefault();
		displayTools();
	});
}

//Main Page Render & Display

function displayTools() {
	$('.startText').remove();
	buildStatsPage();
}

function buildStatsPage() {
	$('main').html(`
		<section role="region">
			<div class="input box"><p>This is the input form</p></div>
			<div class="results box"><p>This is the results box<p></div>
		</section>`);
}
//Run the page

letsGoButtonClicked();