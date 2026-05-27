let gamePattern=[];
let userclickedPattern=[];
let buttonColors=["red","blue","green","yellow"];

let started = false;

let level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    let userChosenColor=$(this).attr("id");
    userclickedPattern.push(userChosenColor);
    playSound(userChosenColor);
animatePress(userChosenColor);
    checkAnswer(userclickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userclickedPattern[currentLevel]){
        console.log("success");
        if(userclickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart The Game");

        startOver();
    }
}

function nextSequence()
{
    userclickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber=Math.floor(Math.random()*4);

    let randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  
}

function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
{
    $("#"+currentColor).removeClass("pressed");
},100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}