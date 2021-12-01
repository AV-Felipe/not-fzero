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


function startRace() {
    let laps = chosenRaceMode.laps;
    //let laps = 1;
    //console.log(laps);
    let lapWinners = [];
    let playersCount = raceCompetitors.length;
    for (let i = 0; i < laps; i++){
        let lapResults = [];
        for (let racer = 0; racer < playersCount; racer++){
            lapResults.push(getRacerSped(raceCompetitors[racer]));
        }
        console.log(lapResults);
        //view: https://dev.to/will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-cha
        //and: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        //for details on Set
        if (new Set(lapResults).size !== lapResults.length){
            i--;
            console.log('houve um empate');
        }else{
            const maxSpeed = Math.max(...lapResults);
            console.log(maxSpeed);
            lapWinners.push(lapResults.indexOf(maxSpeed));
        }
    }
    console.log(lapWinners);
    console.log(getWinner(lapWinners, playersCount));
}

function getRacerSped(racer) {
    let speedRange = racer.speedMax - racer.speedMin;
    let baseSpeed = Math.floor(Math.random()*speedRange) + racer.speedMin;
    let currentSpeed = baseSpeed - (racer.skid * baseSpeed);
    return (currentSpeed);
}

function getWinner(valueArray, numberOfPlayers) {
    let winsPerPlayer =[0, 0, 0, 0, 0, 0];
    console.log(`receby a array ${valueArray} e a quantidade ${numberOfPlayers}`);
    for(let a = 0; a < numberOfPlayers; a++){
        for(let b = 0; b < valueArray.length; b++){
            if (valueArray[b] === a){
                winsPerPlayer[a]++;
            }
        }
    }
    return(winsPerPlayer);
}