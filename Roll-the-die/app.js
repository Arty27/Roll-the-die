var score,roundScore,activePlayer,gamePlaying;

function initialize(){
    score=[0,0]
    activePlayer=1;
    roundScore=0;
    gamePlaying=true;

    var p1=document.getElementById("player-name-1").value
    var p2=document.getElementById("player-name-2").value

    if(!p1){ p1="Player 1"}
    if(!p2){ p2="Player 2"}

    document.getElementById('dice-1').style.display="none";
    document.getElementById('dice-2').style.display="none";

    document.getElementById('score-1').textContent="0";
    document.getElementById('score-2').textContent="0";

    document.getElementById('current-1').textContent="0";
    document.getElementById('current-2').textContent="0";

    document.getElementById('name-1').textContent=p1;
    document.getElementById('name-2').textContent=p2;

    document.querySelector('.player-1').classList.remove('winner')
    document.querySelector('.player-2').classList.remove('winner')
    document.querySelector('.player-1').classList.remove('active')
    document.querySelector('.player-2').classList.remove('active')
    document.querySelector('.player-1').classList.add('active')

    document.getElementById('final-score').value=""
}


initialize()

function newGame(){ initialize()}

function roll(){
    if(gamePlaying){
        var dice1=Math.floor(Math.random()*6)+1
        var dice2=Math.floor(Math.random()*6)+1
        console.log(dice1+' '+dice2)
        document.getElementById("dice-1").style.display="block"
        document.getElementById("dice-2").style.display="block"
        document.getElementById("dice-1").src="images/d-"+dice1+".png";
        document.getElementById("dice-2").src="images/d-"+dice2+".png";

        if(dice1!==1 && dice2!==1 ){
            roundScore+=dice1+dice2
            document.querySelector("#current-"+activePlayer).textContent=roundScore
        }
        else{
            nextPlayer()
        }
    }
}

function nextPlayer(){
    activePlayer===2?activePlayer=1:activePlayer=2
    roundScore=0

    document.getElementById("current-1").textContent="0";
    document.getElementById("current-2").textContent="0";

    document.querySelector(".player-1").classList.toggle('active')
    document.querySelector(".player-2").classList.toggle('active')

    document.getElementById('dice-1').style.display="none";
    document.getElementById('dice-2').style.display="none";

}

function hold(){
    if(gamePlaying){
        score[activePlayer-1]+=roundScore

        document.querySelector("#score-"+activePlayer).textContent= score[activePlayer-1]

        var input=document.getElementById("final-score").value
        var winningScore
        if(input){
            winningScore=input
        }
        else{
            winningScore=100
        }

        if(score[activePlayer-1]>=winningScore){
            document.querySelector("#name-"+activePlayer).innerHTML="winner!<i class='fas fa-star'></i>"

            document.getElementById('dice-1').style.display="none";
            document.getElementById('dice-2').style.display="none";
            
            document.querySelector('.player-'+activePlayer).classList.add('winner');
            document.querySelector('.player-'+activePlayer).classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer()
        }
    }
}