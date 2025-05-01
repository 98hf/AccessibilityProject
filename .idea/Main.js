//Speech recognition api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Sorry, your browser doesn't support Speech Recognition. Try using Google Chrome.");
}
const recognition = new SpeechRecognition();
//keep listening even after a command is done
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
    var command = event.results[event.resultIndex][0].transcript.toLowerCase(); //Speech to text
    console.log('Command received: ' + command); // Log the command for debugging
    var bg = document.querySelector('body');

    //Checks if the transcript contains any commands and executes them
    if(command.includes('black')){
        bg.style.background = 'black';
    } else if (command.includes('white')){
        bg.style.background = 'white';
    } else if (command.includes('nhl') || command.includes('hockey')) {
        document.querySelector('.NHL').style.display = 'block';
        document.querySelector('.NBA').style.display = 'none';
    } else if (command.includes('nba') || command.includes('basketball')) {
        document.querySelector('.NBA').style.display = 'block';
        document.querySelector('.NHL').style.display = 'none';
    } else if (command.includes('font size')) {
        if(command.includes('big')){
            document.querySelector('.NBA').style.fontSize = '40pt';
            document.querySelector('.NHL').style.fontSize = '40pt';
        } else if (command.includes('reset') || command.includes('normal')) {
            document.querySelector('.NBA').style.fontSize = '20pt';
            document.querySelector('.NHL').style.fontSize = '20pt';
        }
    } else if (command.includes('Stats')) {
        if(document.querySelector('.NBA').style.display === 'none'){
            document.querySelector('#statsNHL').scrollIntoView({ behavior: 'smooth' });
        } else if(document.querySelector('.NBA').style.display === 'none'){
            document.querySelector('#statsNHL').scrollIntoView({ behavior: 'smooth' });
        }

    }

    document.querySelector('.transcript').innerHTML ='text transcripted: ' + command;
    console.log('Confidence: ' + event.results[event.resultIndex][0].confidence); //confidence level of what was recognized
}

function checkPM() {
    const checkbox = document.querySelector('input[name="Physical\\/Motor"]');
    return checkbox.checked;
}


function settings() {
    document.getElementsByClassName("settings")[0].style.display = "block";
}

let recActive = false;
function saveAndClose() {
    document.getElementsByClassName("settings")[0].style.display = "none";
    if(checkPM()){
        if(!recActive){
            recognition.start();
            recActive = true;
            console.log('Voice command on');
            document.querySelector('.transcript').innerText = 'listening..';
        }
    } else {
        if(recActive){
            recognition.stop();
            recActive = false;
            console.log('Voice command off');
        }
        document.querySelector('.transcript').innerText = '';
    }
}

function showNHL(){
    document.querySelector('.NHL').style.display = 'block';
    document.querySelector('.NBA').style.display = 'none';
}

function showNBA(){
    document.querySelector('.NHL').style.display = 'none';
    document.querySelector('.NBA').style.display = 'block';
}
