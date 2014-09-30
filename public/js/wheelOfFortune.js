(function(){
	
	function guessLetter(){
		var letter = this.id,
			$this = $(this),
			lettersInPuzzle = $( ".letter_" + letter ),
			result = $("#result");
			numberOfMatches = lettersInPuzzle.length,
			resultMessage = "";
		if($this.hasClass("guessed")){
			return;
		}
		
		if( numberOfMatches === 0 ){
			resultMessage = "There are no " + letter.toUpperCase() + "s in the puzzle";
		} else if( numberOfMatches === 1 ){
			resultMessage = "There is 1 " + letter.toUpperCase() + " in the puzzle";
		} else {
			resultMessage = "These are " + numberOfMatches + " " + letter.toUpperCase() + "s in the puzzle";
		}
		
		result.html(resultMessage);
		
		lettersInPuzzle.addClass( "visible" );
		$this.addClass( "guessed" );
	}
	
	function solvePuzzle(e){
		e.preventDefault();
		var lettersInPuzzle = $( "div[class*='letter_']" );
		
		lettersInPuzzle.addClass( "visible" );
	}
	
	$( document ).on( "click", ".guessLetter", guessLetter );
	$( document ).on( "click", "#solveLink", solvePuzzle );
})();