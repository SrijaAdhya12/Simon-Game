var buttonColours=["red" , "blue" , "green" ,"yellow"];

var gamePattern=[];


var userClickedPattern = [];

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("sucess");

    if  (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 100);

      }
  } else{
    console.log("false");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, press any key to restart!")
     startOver();
  }
}



function nextSequence(){

    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level);

var randomNumber= Math.floor(Math.random()*3);

var randomChosenColour=  buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#randomChosenColour").fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

animatePress(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(key)
{
    $("#"+key).addClass("pressed");

    setTimeout(function(){
        $("#"+key).removeClass("pressed")
    },100);
}
  
function startOver(){
 level = 0;
 gamePattern=[];
 started= false;
}
 