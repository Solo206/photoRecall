$(document).ready(function(){
	//executes series of command when document is loaded

	//reset all settings
	reset();
	//randomize pairs
	randomize();

	$(".start").click(function(){
		//hides intro and shows play screen after start button pressed
		$(".intro").hide();
		$(".play").show();

	});
	//initialize firstphoto as an empty value
	var firstPhoto="";
	var secondPhoto="";
	$(".squares").click(function(){

		if (firstPhoto==""){
			//after clicking on square->get attribute data from square and background to new color
			firstPhoto=$(this).attr("data");

			//testing to see whether firstPhoto variable returns strings
			$(this).css({'background':''+firstPhoto});

			$(this).addClass('match'); 
		}
		else{

			secondPhoto=$(this).attr("data");
			$(this).css({'background':''+secondPhoto});

			if (secondPhoto==firstPhoto){
				$(this).addClass('match');
				//remove matched DOM element

				setTimeout('removeTiles()',3000);

			}
			else{
				$(this).addClass('unmatch');
				setTimeout('resetTiles()',3000);
			}

			firstPhoto="";
			secondPhoto="";
		}
		//add 'match' to class of 1st clicked square

			
	// 	//get attribute of string data of associated with square
	// 	var dataValue=$(this).getAttribute("data");
		
		//listen for another click event
		// $(".squares").click(function(){

		// 	//after clicking on square->get attribute data from square and background to new color
		// 	var secondPhoto=$(this).attr("data");

		// 	//testing to see whether secondPhoto variable returns strings
		// 	$(this).css({'background':''+secondPhoto});

		// 	setTimeout(3000);
		// 	if (secondPhoto==firstPhoto){
		// 		//the firstPhoto and secondPhoto data values are the same
		// 		//then add class match to secondPhoto square and hide match squares
		// 		$(this).addClass('match');
		// 		$('.match').hide();
		// 	}
		// 	else{

		// 		//otherwise revert current square background to blue
		// 		$(this).css({'background':'blue'});

		// 		//revert match square back to blue
		// 		$('.match').css({'background':'blue'});

		// 		//and remove 'match' from first square
		// 		$('.match').removeClass('match');
		// 	}

		
	});

});
function reset(){
	 // resets all settings back to original state
	 $(".intro").show();
	 $(".play").hide();
	 $(".gameOver").hide();
};

function randomize(){
	//randomly assign values of 1-8 to a square
	//if the 2 squares are already assigned same value, remove number from
	var count=1;

	//create an number counter array to prevent more than 2 numbers from being assigned  
	var countArray=[0,0,0,0,0,0,0,0];

	//need to assign random values to squares divs
	//but only 2 squares make have the same number
	while(count<=16){

		//initialize randomnumber variable

			//initializes randNum variable with numerical value from 1-8
			var randNum=Math.floor((Math.random()*8)+1);

			//test alerts
			// alert(randNum);
			// alert(countArray);

			while (countArray[randNum-1]>=2){
				//will loop if the array element value is two or more,
				//i.e. 2 numbers of same value have already been assigned to squares

				//choose another random number
				randNum=Math.floor((Math.random()*8)+1);
			}

			//increment that random number in array counter
			countArray[randNum-1]++;


		// alert(randNum);
		// alert(countArray);

		//call photostring-json data function
		var photoString=jsonPhoto(randNum);
		
		//assigns randomnumber to square data html5 attribute
		document.getElementById(''+count).setAttribute('data',photoString);
		$('#'+count).addClass(""+randNum);
		




		//test to check if counter is working correctly
		// $("#"+count).css({"background":"red"});
		
		//increments counter for squares
		count++;
	}
}
function jsonPhoto(randNum){
	//function gets json data from web than returns photo web string


	var arrayPhoto=["red","green","yellow","orange","black","white","purple","darkgreen"];

	return arrayPhoto[randNum-1];
}
function resetTiles(){
				$('.unmatch').css({'background':'blue'});
				$('.match').css({'background':'blue'});
				$('.match').removeClass('match');
				$('.unmatch').removeClass('unmatch');
}
function removeTiles(){
				// $('.match').remove();
				$('.match').addClass('hides');
				// $('.hides').css({'background':'black'});
				$('.match').removeClass('match');
}