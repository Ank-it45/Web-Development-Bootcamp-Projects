let randomNumbers1=Math.floor(Math.random()*6)+1;
let randomDiceImage1="dice"+randomNumbers1+".png";
let randomImageSource1="./images/"+randomDiceImage1;
document.querySelectorAll("img")[0].setAttribute("src",randomImageSource1);

let randomNumbers2=Math.floor(Math.random()*6)+1;
let randomDiceImage2="dice"+randomNumbers2+".png";
let randomImageSource2="./images/"+randomDiceImage2;
document.querySelectorAll("img")[1].setAttribute("src",randomImageSource2);

if(randomNumbers1>randomNumbers2)
{
    document.querySelector("h1").textContent="Player1 Wins";
}
else if(randomNumbers1===randomNumbers2)
{
    document.querySelector("h1").textContent="Draw";
}
else
{
    document.querySelector("h1").textContent="Player2 Wins";
}