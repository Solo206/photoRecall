$(document).ready(function(){

	//reset all settings
	reset();
	//randomize pairs
	randomize();

	//default
	var topic="dogs";
	$(".start").click(function(){
		//hides intro and shows play screen after start button pressed
		topic=document.getElementById('txtopic').value;
		//executes series of command when document is loaded
		getArrayPhoto(topic);
		$(".intro").hide();
		$(".play").show();
		// $(".gameOver").show()

	});
	//initialize firstphoto as an empty value
	var firstData="";
	var secondData="";
	var firstfoto=null;
	var secondfoto=null;
	var starCount=0;
	// var clickCount=0;

	$(".squares").click(function(event){
		event.preventDefault();

		if (firstData==""){
			//after clicking on square->get attribute data from square and background to new color
			firstfoto=$(this).find('> div').attr('id');
			firstData=document.getElementById(""+firstfoto).getAttribute('data');

			$("#"+firstfoto + " img").css({"opacity":"1"});
		}
		else if (firstData!=""){
			//firstfoto not equal to empty

			//find the descendant div of current element and get attribute of id, set as secondfoto 
			secondfoto=$(this).find('> div').attr('id');
			//set secondData as attribute of secondfoto
			secondData=document.getElementById(""+secondfoto).getAttribute('data');
			
			//set opacity to 1 so second foto can be visible
			$("#"+secondfoto+ " img").css({"opacity":"1"});

			//if attribute of second data equals attribute of first data
			if (secondData==firstData){

				//remove matched DOM element
				// alert(firstData);
				// alert(secondData);

				//increment star count
				starCount++;

				//wait half a second and remove phototiles
				setTimeout(removeTiles,500, firstfoto,secondfoto,starCount);

			}
			else{
				//otherwise wait half a second and set opacity back to 0 on selected tiles
				setTimeout(resetTiles,500,firstfoto,secondfoto);

			}

			firstfoto=null;
			secondfoto=null;
			firstData="";
			secondData="";
		}
		if (starCount==8){
			//when the star counter fills to 8 i.e. stars are filled to 8, then wait 1 second and load
			//game over tile
			setTimeout(setGameOver,1000,topic);
		}
	});
	$('.replay').click(function(){
		//reloads entire page
		location.reload();
	})

});
function reset(){
	 // resets all settings back to original state
	 $(".intro").show();
	 $(".play").hide();
	 $(".gameOver").hide();
};

function randomize(){
	//Purpose: randomly assign values of 1-8 to a square
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
		
		
		//increments counter for squares
		count++;
	}
}
function arrayColor(randNum){
	//function gets json data from web than returns photo web string



}
function resetTiles(firstfoto,secondfoto){

				//reset photo tiles by setting opacity to 0
				$("#"+firstfoto+ " img").css({'opacity':'0'});
				$("#"+secondfoto+ " img").css({'opacity':'0'});

}
function removeTiles(firstfoto,secondfoto,starCount){
				
				//remove tiles by setting parent of photo tiles to 0 opacity 
				$("#"+firstfoto).parent().css({'opacity':'0'});
				$("#"+secondfoto).parent().css({'opacity':'0'});

				//show stars based on number of stars counted
				setStar(starCount);

}

// From Instagram API
// CLIENT ID	16bd30e740c046ec935b89ff0c315d4a
// CLIENT SECRET	2061451a33984b9f95e59a720785c740
function getArrayPhoto(topic){
	// "https://instagram.com/oauth/authorize/?client_id=16bd30e740c046ec935b89ff0c315d4a&redirect_uri=http://solo206.github.io/photoRecall&response_type=token"
	var arrayPhoto="";
	var result=$.ajax({
		type:"GET",
		dataType:"jsonp",
		cache:false,

		//retrieve most current topic related photos from Instagram server
		//url:"https://api.instagram.com/v1/tags/"+topic+"/media/recent?access_token=1487584775.16bd30e.d1f77a3709a4461daec1af4e356955b2",
		//url:"https://api.instagram.com/v1/media/popular?client_id=d4c7f23188e049b69567dcf057406c7d",
		url:"https://api.instagram.com/v1/tags/"+topic+"/media/recent?client_id=d4c7f23188e049b69567dcf057406c7d",
		success:function(data){
		for(var i=1;i<9;i++){

			//append photo to photoHolder in photoTile area in play container
				$("."+i).append('<img src="'+data.data[i].images.low_resolution.url+'"width="100%">');
				
			}//for

		for (var i=1;i<17;i++){
			//set all phototiles in play container to 0 opacity, i.e. hide photos
			$("#"+i+" img").css({'opacity':'0'});
		}

		//append photo to prize photo area in gameOvercontainer
		$(".photo").append('<img src="'+data.data[9].images.low_resolution.url+'"width="auto" height="100%">');	
		

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
function setGameOver(topic){
	$('.play').hide();
	$('.gameOver').show();
	setTimeout(removeCongrat,500);
}

function removeCongrat(){
	//set superb title to translucent
	$('.superb').css({'opacity':'0'});
}
