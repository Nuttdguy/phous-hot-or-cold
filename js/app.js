
$(document).ready(function(){
	
	startGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});



function startGame() {
	
	var secret;
	function activeSecretNumber() {
		secret = Math.floor((Math.random() * 100));
	}
	
	activeSecretNumber();
	
	//--------------------------------------------
	
	var count = 0;
	$('#guessButton').on('click', function(event) {
		event.preventDefault();
		
		var currentGuess = parseInt($('#userGuess').val());		
		$('#guessList').append('<li>' + currentGuess + '</li>');
		$('#userGuess').val('');
		console.log(secret + ' -- secret number ');
		console.log(currentGuess + ' -- current guess ');
			
		var howClose; 
		if (secret > currentGuess) {
			howClose = (secret - currentGuess);
		} else {
			howClose = (currentGuess - secret);
		}
		
		if (currentGuess === secret) {
			$('#feedback').text('Game Over!');
			activeSecretNumber();
			$('#guessList li').remove();
			count = -1;
			$('#count').text(count);
		} else if (howClose <= 5) {
			$('#feedback').text('Stop! You\'re hair is on fire!')
		} else if (howClose <= 10) {
			$('#feedback').text('Look! You\'re car is on fire!')
//			console.log(howClose + ' -- You\'re within 10');
		} else if (howClose <= 20) {
			$('#feedback').text('Hey you, over there! Too close!')
//			console.log(howClose + ' -- You\'re within 20'); 
		} else if (howClose <= 30) {
			$('#feedback').text('You\'re making me sweat!');
//			console.log(howClose + ' -- You\'re within 30');
		} else if (howClose <= 40) {
			$('#feedback').text('And I thought you could read my mind!');
//			console.log(howClose + ' -- You\'re within 40');
		} else {
			$('#feedback').text('Ain\'t never going to get it!');
//			console.log(howClose + ' -- You\'re a mile away');
		}
		
		if (!$.isNumeric(currentGuess)) {
			$('#userGuess').val('');
			$('#guessList li').last().remove();
			count--;
			$('#count').text(count);
		} 
		
		count++;
		$('#count').text(count);
		
	})
	
	function newGame() {
	$('.new').on('click', function(e) {
		activeSecretNumber();
		count = 0;
		$('#count').text(count);
		$('#guessList li').remove();
		console.log(secret);
		})
	}
	
}












