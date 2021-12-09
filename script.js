// !!! The draw logic is very poor, we should only check for draws in the first, second and third place

// OBJECT CONSTRUCTOR

function newCar (driverName) {
    
    let carKind = pickKind();
    let driver = driverName;
    let maxSpeed = setValue(cartTypes[carKind]['maximumSpeed']['minimum'], cartTypes[carKind]['maximumSpeed']['maximum']);
    let minSpeed = setValue(cartTypes[carKind]['minimumSpeed']['minimum'], cartTypes[carKind]['minimumSpeed']['maximum']);
    let skid = setValue(cartTypes[carKind]['skid']['minimum'], cartTypes[carKind]['skid']['maximum'], 'skid');
    
    function pickKind() {
        let random = Math.random();
        if(random <= 0.6){
            return(Object.getOwnPropertyNames(cartTypes)[0]);
        }else if(0.6 < random && random <=0.95 ){
            return(Object.getOwnPropertyNames(cartTypes)[1]);
        }else{
            return(Object.getOwnPropertyNames(cartTypes)[2]);
        }
    };
    
    function setValue(min, max, type = 'speed') {
        if(type == 'skid'){
            return((Math.round((Math.random() * (max - min))*100) / 100) + min);
        }else{
            return(Math.floor(Math.random() * (max - min)) + min);
        }
        
    };

    return({driver, carKind, maxSpeed, minSpeed, skid});
};

// CONSTANT OBJECTS
const cartTypes = {
    
    popular: {
        maximumSpeed: {minimum: 180, maximum: 200},
        minimumSpeed: {minimum: 110, maximum: 130},
        skid: {minimum: 3, maximum: 4}
    },

    sport: {
        maximumSpeed: {minimum: 195, maximum: 215},
        minimumSpeed: {minimum: 125, maximum: 145},
        skid: {minimum: 2, maximum: 3}
    },

    superSport: {
        maximumSpeed: {minimum: 210, maximum: 230},
        minimumSpeed: {minimum: 140, maximum: 160},
        skid: {minimum: 1, maximum: 1.75}
    },
};


// MOCK DB
const raceCompetitors = [
    newCar('pedro'), newCar('juca'), newCar('edna')
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
const numberOfLapsDisplay = document.getElementById('lapsRun');

// LISTENERS
buttonStartRace.addEventListener('click', startRace);
buttonChangeRaceMode.addEventListener('click', changeRaceMode)
buttonAddNewPlayer.addEventListener('click', createKart);


// FUNCTIONS

function startRace() {
    let laps = chosenRaceMode.laps;
    let lapWinners = [];
    let playersCount = raceCompetitors.length;
    
    // generates the winner for each lap
    for (let i = 0; i < laps; i++){
        
        let lapResults = [];
        for (let racer = 0; racer < playersCount; racer++){
            lapResults.push(getRacerSped(raceCompetitors[racer]));
        }
        //console.log(lapResults);

        const maxSpeed = Math.max(...lapResults);
        //console.log(maxSpeed);
        lapWinners.push(lapResults.indexOf(maxSpeed));

    }

    console.log(lapWinners);
    console.log(getWinner(lapWinners, playersCount));

    //run aditional laps in case of competitors draw
    while(getWinner(lapWinners, playersCount) === 'draw'){
        
        
        let lapResults = [];
        for (let racer = 0; racer < playersCount; racer++){
            lapResults.push(getRacerSped(raceCompetitors[racer]));
        }

        const maxSpeed = Math.max(...lapResults);
        lapWinners.push(lapResults.indexOf(maxSpeed));
    
        
    }
    //console.log(getWinner(lapWinners, playersCount));

    let playersResults = getWinner(lapWinners, playersCount);
    
    const winner = Math.max(...playersResults);
    //console.log(winner);
    //console.log(playersResults.indexOf(winner));
    const winnerIndex = playersResults.indexOf(winner);
    //console.log(raceCompetitors[winnerIndex]);

    winnerNameDisplay.innerHTML = raceCompetitors[winnerIndex].driver;
    numberOfLapsDisplay.innerHTML = String(lapWinners.length); 
};

// Calculates the car speed (used for each lap)
function getRacerSped(racer) {
    let speedRange = racer.maxSpeed - racer.minSpeed;
    let baseSpeed = Math.floor(Math.random()*speedRange) + racer.minSpeed;
    let currentSpeed = baseSpeed - ((racer.skid / 100) * baseSpeed);
    return (currentSpeed);
};

// Check for race winner
function getWinner(valueArray, numberOfPlayers) {
    //creates an array where each element index stands for a racer and its value the number of times he as won
    let winsPerPlayer = new Array(numberOfPlayers).fill(0); //creates an array filed with zeroes for the desired lenght: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    //console.log(`recebi a array ${valueArray} e a quantidade ${numberOfPlayers}`);
    
    //counts, for each racer, the number of laps he has won
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
};


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
};

// generates new car for new competitors
function createKart (){
    const newkart = newCar(textFieldNewPlayerName.value);
    //console.log(newkart);

    if(raceCompetitors.length < 6){
        document.getElementById(`player${raceCompetitors.length + 1}`).innerHTML = newkart.driver;
        document.getElementById(`player${raceCompetitors.length + 1}`).classList.remove('unsetPlayer')
        raceCompetitors.push(newkart);
        console.log(raceCompetitors);
    }else{
        textFieldNewPlayerName.value = 'não dá mais!';
    }

};