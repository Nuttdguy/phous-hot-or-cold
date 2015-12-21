var secret = 0; // initializing secret variable within global object -- not very secret
var count = 0;
var alreadyGuessed = [];

$(document).ready(function(){

	newGame(); //  loaded into global window object - event triggered by "new game" button
	currentGuess(); // loaded into global window object - event triggered by click
	getSecretNumber(); // invokes the function to generate a secret number
	

/*--- Display information modal box ---*/
	$(".what").click(function(){
		$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

});


function getSecretNumber() {  // Generates a secret number
	
	this.secret = Math.floor((Math.random() * 100));
	console.log(secret);
	
}

function currentGuess() {  // Invokes on click of guess button

	$('#guessButton').on('click', function(event) {
		event.preventDefault();

		var guess = parseInt($('#userGuess').val());		
		$('#guessList').append('<li>' + guess + '</li>');
		$('#userGuess').val('');
		
		didUserGuess(guess); // will probably need to move these other functions below

	})
	
}

var didUserGuess = function(guessedNumbers) {
	
	alreadyGuessed.push(guessedNumbers); //
	
	for(i = 0; i < alreadyGuessed.length; i++) {
		if (guessedNumbers === alreadyGuessed[i-1] || !$.isNumeric(guessedNumbers)) { // checking last item in array for each index of the current array
			alreadyGuessed.pop(); // removing last index of array if above true
			$('#feedback').text('You already guessed that number'); // updates feedback message
			if ($('#guessList li').length > alreadyGuessed.length) { // checks length of current guesses equal to array length
				$('#guessList li').last().remove(); // removes last item of guess list
			}
			return; // ends loop
		}
		
		console.log(alreadyGuessed);
	}
	
	isGuessNumeric(guessedNumbers); // passes guess, validates user input and increments/decrements counter
	howClose(guessedNumbers); // passes value to howClose function
}

var isGuessNumeric = function(num) {
	
	if (!$.isNumeric(num) || num > 101) { // Check if user guesss is a number
		$('#userGuess').val('');  // resets the input box value
		$('#guessList li').last().remove(); // removes the link last generated
		return;
	} 
		
		count++; // increments the global count variable
		$('#count').text(count); // updates the count text
}

var howClose = function(userGuess) {
	
//	console.log(secret);
//	console.log(userGuess + "  in howClose function");
	
	var howCloseIsGuess; // declares the variable for resulting value
	if (secret > userGuess) {
		howCloseIsGuess = (secret - userGuess); // 
	} else {
		howCloseIsGuess = (userGuess - secret);
	}	
	
	// passes users guess and calculated difference to checkUserGuess function
	checkUserGuess(userGuess, howCloseIsGuess);
	
}

function checkUserGuess(userGuess, isGuessCorrect) {
//	console.log( isGuessCorrect + "  in checkUserGuess function")
	
	if (userGuess === secret) { // checks if userGuess is correct
		$('#feedback').text('You Win! Game Over!');
		getSecretNumber();  // generates new secret number
		$('#guessList li').remove(); // removes all guesses
		count = 0; // return count to 0
		$('#count').text(count); // return count text to 0
	} else if (isGuessCorrect <= 5) {
		$('#feedback').text('Stop! You\'re hair is on fire!')
	} else if (isGuessCorrect <= 10) {
		$('#feedback').text('Look! You\'re car is on fire!')
	} else if (isGuessCorrect <= 20) {
		$('#feedback').text('Hey you, over there! Too close!')
	} else if (isGuessCorrect <= 30) {
		$('#feedback').text('You\'re making me sweat!');
	} else if (isGuessCorrect <= 40) {
		$('#feedback').text('And I thought you could read my mind!');
	} else {
		$('#feedback').text('Ain\'t never going to get it!');
	}	
}

function newGame() { // reset game
	
	$('.new').on('click', function(e) {
		getSecretNumber();
		count = 0;
		$('#count').text(count);
		$('#guessList li').remove();
	})	
}












