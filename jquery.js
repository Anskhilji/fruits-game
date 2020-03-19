var playing = false;
var score;
var trialsleft;
var step;
var action; // used for setInterval function
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){
// click on start rest button
$('#startreset').click(function(){

	// we are playing
	if (playing == true) {
		
		// reload page
		location.reload();
	}else{

		// we are not playing
		playing = true; //game initiated
		
		

		// set score to 0
		score = 0;
		$('#scorevalue').html(score);

		// show trials left
		$('#trialsleft').show();

		// show trials left
		trialsleft = 3;
		addHearts();

		// hide gameOver box
		$('#gameOver').hide(); 
		
		// change button text to reset game
		$('#startreset').html("Reset Game");

		// start sending fruits
		startAction();

	}
});

$('#fruit1').mouseover(function(){

	score++;
	$('#scorevalue').html(score); //update score

	// play sound 
	// document.getElementById('sliceSound').play();
	$('#sliceSound')[0].play();

	// stop fruit 
	clearInterval(action);

	// hide it 
	$('#fruit1').hide("explode", 500); //slice fruit

	//  send the new fruit
	setTimeout(startAction, 500);


});
// slice a fruit
	// play sound
	// explode fruit
// functions

function addHearts(){
	$('#trialsleft').empty();
	for(i=0; i<trialsleft; i++){
			$('#trialsleft').append('<img src="images/heart.png" class="life">');
		}

}

		// start sending fruits
function startAction() {

	//generating a fruit
	$('#fruit1').show();
	chooseFruits(); //choose random fruits
	$('#fruit1').css({'left': Math.round(550*Math.random()), 'top': -50}); // random position

	// generate a random step
	step = 1+ Math.round(5*Math.random());
	// change step

	// move fruit down by one step every 10ms
	action = setInterval(function(){

		//move fruit by one stepS
		$('#fruit1').css('top', $('#fruit1').position().top + step);

		// check if the fruit is too low
		if ($('#fruit1').position().top > $('#fruitsContainer').height()) {
			// check if we trials left

			if (trialsleft > 1) {
			//generating a fruit
				$('#fruit1').show();
				chooseFruits(); //choose random fruits

				$('#fruit1').css({'left': Math.round(550*Math.random()), 'top': -50}); // random position

				// generate a random step
				step = 1+ Math.round(5*Math.random()); // change step

				//reduce trials by one 
				trialsleft --;

				//populate trialsleft box 

				addHearts();
			} else {
				//game over
				playing = false; // we are not playing anymore

				$('#startreset').html('Start game'); // change button to start game

				$('#gameOver').show();
				$('#gameOver').html('<p>Game Over!</p><p>Your score is '+ score +'</p>');

				// hide trialsleft
				$('#trialsleft').hide();
				stopAction();

			}
		}

	}, 10);
}
// choose a random fruits

function chooseFruits() {
	$('#fruit1').attr('src','images/' + fruits[Math.round(8*Math.random())] + '.png');
}

// stop running action
function stopAction() {
	clearInterval(action);
	$('#fruit1').hide();
}

});