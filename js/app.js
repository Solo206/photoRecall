$(document).ready(function(){
	//executes series of command when document is loaded
	getArrayPhoto();
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
	var firstData="";
	var secondData="";
	var firstfoto=null;
	var secondfoto=null;
	var starCount=0;

	$(".squares").click(function(event){
		event.preventDefault();

		if (firstData==""){
			//after clicking on square->get attribute data from square and background to new color
			firstfoto=$(this).find('> div').attr('id');
			firstData=document.getElementById(""+firstfoto).getAttribute('data');
			// alert(firstData);
			//testing to see whether firstPhoto variable returns strings
			// $(this).css({'background':'url('+firstPhoto+")"});
			$("#"+firstfoto + " img").css({"opacity":"1"});
		}
		else if (firstData!=""){
			//firstfoto not equal to empty

			secondfoto=$(this).find('> div').attr('id');
			secondData=document.getElementById(""+secondfoto).getAttribute('data');
			$("#"+secondfoto+ " img").css({"opacity":"1"});


			if (secondData==firstData){

				//remove matched DOM element
				// alert(firstData);
				// alert(secondData);
				starCount++;
				setTimeout(removeTiles,3000, firstfoto,secondfoto,starCount);

			}
			else{
				// alert(firstfoto);
				// alert(secondfoto);
				setTimeout(resetTiles,3000,firstfoto,secondfoto);
					// resetTiles(firstfoto,secondfoto);
					// firstfoto.css({'opacity':'0'});
					// secondfoto.css({'opacity':'0'});



			}

			firstfoto=null;
			secondfoto=null;
			firstData="";
			secondData="";
		}
		if (starCount==8){
			setTimeout(setGameOver,2000);
		}
	});
	$('.replay').click(function(){
		$(".squares").css({'opacity':'1'});
		$(".photoHold").css({'opacity':'0'});
		reset();

	})

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


			
		//uses the id to add random number class to  inner most div i.e. photoHold
		$('#'+count).addClass(""+randNum).attr("data",""+randNum);
		
		//test to check if counter is working correctly
		// $("#"+count).css({"background":"red"});
		
		//increments counter for squares
		count++;
	}
}
function arrayColor(randNum){
	//function gets json data from web than returns photo web string



}
function resetTiles(firstfoto,secondfoto){
				$("#"+firstfoto+ " img").css({'opacity':'0'});
				$("#"+secondfoto+ " img").css({'opacity':'0'});

}
function removeTiles(firstfoto,secondfoto,starCount){
				
				$("#"+firstfoto).parent().css({'opacity':'0'});
				$("#"+secondfoto).parent().css({'opacity':'0'});
				setStar(starCount);

}

// From Instagram API
// CLIENT ID	16bd30e740c046ec935b89ff0c315d4a
// CLIENT SECRET	2061451a33984b9f95e59a720785c740
function getArrayPhoto(){
	// "https://instagram.com/oauth/authorize/?client_id=16bd30e740c046ec935b89ff0c315d4a&redirect_uri=http://solo206.github.io/photoRecall&response_type=token"
	var arrayPhoto="";
	var result=$.ajax({
		type:"GET",
		dataType:"jsonp",
		cache:false,
		// url:"https://api.instagram.com/v1/media/popular?client_id=16bd30e740c046ec935b89ff0c315d4a&access_token=1487584775.16bd30e.d1f77a3709a4461daec1af4e356955b2",
		url:"https://api.instagram.com/v1/tags/dogs/media/recent?access_token=1487584775.16bd30e.d1f77a3709a4461daec1af4e356955b2",
		// url:"https://api.instagram.com/v1/locations/514276/media/recent?access_token=1487584775.16bd30e.d1f77a3709a4461daec1af4e356955b2",
		success:function(data){
		for(var i=1;i<9;i++){
				// $("."+(i+1)).css({'background':"url("+data.data[i].images.low_resolution.url+")"});
				$("."+i).append('<img src="'+data.data[i].images.low_resolution.url+'"width="100%">');
				
			}//for
		for (var i=1;i<17;i++){
			$("#"+i+" img").css({'opacity':'0'});
		}
		

		},//success
		error: function(data){
			console.log(data);
		}
	});//ajax
}//function
function setStar(){
		$('.noStar').first().addClass('star');
		$('.noStar').first().removeClass('noStar');
}
function setGameOver(){
	$('.play').hide();
	$('.gameOver').show();
	getPrizePhoto();
}
function getPrizePhoto(){
	// "https://instagram.com/oauth/authorize/?client_id=16bd30e740c046ec935b89ff0c315d4a&redirect_uri=http://solo206.github.io/photoRecall&response_type=token"
	var result=$.ajax({
		type:"GET",
		dataType:"jsonp",
		cache:false,
		url:"https://api.instagram.com/v1/media/popular?client_id=16bd30e740c046ec935b89ff0c315d4a&access_token=1487584775.16bd30e.d1f77a3709a4461daec1af4e356955b2",
		success:function(data){
				$(".photo").append('<img src="'+data.data[9].images.low_resolution.url+'" width="auto" height="100%" style:>');
		},//success
		error: function(data){
			console.log(data);
		}
	});//ajax
}//function