// CLASSES
class kart {
    constructor (driver, speedMax, speedMin, skid) {
        this.driver = driver;
        this.speedMax = speedMax;
        this.speedMin = speedMin;
        this.skid = skid;
    }
}

// MOCK DB
const raceCompetitors = [
    {driver: 'pedro', speedMax: 230, speedMin: 150, skid: 0.03}, {driver: 'edna', speedMax: 220, speedMin: 180, skid: 0.01},
    {driver: 'juca', speedMax: 260, speedMin: 120, skid: 0.05} 
];

const gameTypeOptions = [
    {name: 'corrida rápida', laps: 10}, {name: 'grande prêmio', laps: 70}, {name:'enduro', laps: 160}
];

// GLOBAL VARIABLES
let chosenRaceMode = gameTypeOptions[0];

// ELEMENTS
const winnerNameDisplay = document.getElementById('winnerResult');
const gameMenu = document.getElementById('menu');
const textFieldNewPlayerName = document.getElementById('newPlayerName');
const buttonAddNewPlayer = document.getElementById('addPlayerButton');
const raceModeDisplay = document.getElementById('raceMode');
const buttonChangeRaceMode = document.getElementById('changeModeButton');
const buttonStartRace = document.getElementById('startButton');

// LISTENERS
buttonStartRace.addEventListener('click', startRace);
buttonChangeRaceMode.addEventListener('click', changeRaceMode)


// FUNCTIONS
function startRace() {
    let laps = chosenRaceMode.laps;
    let lapWinners = [];
    let playersCount = raceCompetitors.length;
    for (let i = 0; i < laps; i++){
        let lapResults = [];
        for (let racer = 0; racer < playersCount; racer++){
            lapResults.push(getRacerSped(raceCompetitors[racer]));
        }
        console.log(lapResults);

        const maxSpeed = Math.max(...lapResults);
        console.log(maxSpeed);
        lapWinners.push(lapResults.indexOf(maxSpeed));

    }
    console.log(lapWinners);
    console.log(getWinner(lapWinners, playersCount));
    while(getWinner(lapWinners, playersCount) === 'draw'){
        
        
        let lapResults = [];
        for (let racer = 0; racer < playersCount; racer++){
            lapResults.push(getRacerSped(raceCompetitors[racer]));
        }

        const maxSpeed = Math.max(...lapResults);
        lapWinners.push(lapResults.indexOf(maxSpeed));
    
        
    }
    console.log(getWinner(lapWinners, playersCount));

    let playersResults = getWinner(lapWinners, playersCount);
    
    const winner = Math.max(...playersResults);
    console.log(winner);
    console.log(playersResults.indexOf(winner));
    const winnerIndex = playersResults.indexOf(winner);
    console.log(raceCompetitors[winnerIndex]);

    winnerNameDisplay.innerHTML = raceCompetitors[winnerIndex].driver;    
}

function getRacerSped(racer) {
    let speedRange = racer.speedMax - racer.speedMin;
    let baseSpeed = Math.floor(Math.random()*speedRange) + racer.speedMin;
    let currentSpeed = baseSpeed - (racer.skid * baseSpeed);
    return (currentSpeed);
}

function getWinner(valueArray, numberOfPlayers) {
    let winsPerPlayer = new Array(numberOfPlayers).fill(0); //creates an array filed with zeroes for the desired lenght: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    console.log(`receby a array ${valueArray} e a quantidade ${numberOfPlayers}`);
    for(let a = 0; a < numberOfPlayers; a++){
        for(let b = 0; b < valueArray.length; b++){
            if (valueArray[b] === a){
                winsPerPlayer[a]++;
            }
        }
    }
    
    //view: https://dev.to/will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-cha
    //and: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    //for details on Set
    if (new Set(winsPerPlayer).size !== winsPerPlayer.length){
        return('draw');
    }else{
        return(winsPerPlayer);
    }
}


function changeRaceMode(){
    let availableModes = gameTypeOptions.length;
    console.log(gameTypeOptions.indexOf(chosenRaceMode));
    let currentOption = gameTypeOptions.indexOf(chosenRaceMode);
    if((currentOption + 1) < availableModes){
        currentOption++;
    }else{
        currentOption = 0;
    }
    chosenRaceMode = gameTypeOptions[currentOption];
    console.log(chosenRaceMode);
    raceModeDisplay.innerHTML = chosenRaceMode.name;
}