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
    if (command.includes('nhl') || command.includes('hockey')) {
        showNHL();
    } else if (command.includes('nba') || command.includes('basketball')) {
        showNBA();
    } else if (command.includes('home')) {
        showHome();
    } else if (command.includes('font size')) {
        if(command.includes('big')){
            document.querySelector('.NBA').style.fontSize = '40pt';
            document.querySelector('.NHL').style.fontSize = '40pt';
        } else if (command.includes('reset') || command.includes('normal')) {
            document.querySelector('.NBA').style.fontSize = '20pt';
            document.querySelector('.NHL').style.fontSize = '20pt';
        }
    } else if (command.includes('stats') || command.includes('scores')) {
        document.querySelector('#statsNBA').scrollIntoView({ behavior: 'smooth' });
    } else if (command.includes('scroll')) {
        if (command.includes('down')) {
            window.scrollBy({ top: 300, behavior: 'smooth' });
        } else if (command.includes('up')) {
            window.scrollBy({ top: -300, behavior: 'smooth' });
        }
    } else if(command.includes('more recent')){
        let iframe = document.getElementById("NBAgames");
        let iframee = document.getElementById("NHLgames");
        iframe.contentWindow.scrollBy({ top: 300, behavior: 'smooth' });
        iframee.contentWindow.scrollBy({ top: 300, behavior: 'smooth' });
    } else if(command.includes('less recent')){
        let iframe = document.getElementById("NBAgames");
        let iframee = document.getElementById("NHLgames");
        iframe.contentWindow.scrollBy({ top: -300, behavior: 'smooth' });
        iframee.contentWindow.scrollBy({ top: -300, behavior: 'smooth' });
    }

    if(checkPM()){
        document.querySelector('.transcript').innerHTML ='text transcripted: ' + command;
    }
    console.log('Confidence: ' + event.results[event.resultIndex][0].confidence); //confidence level of what was recognized
}

recognition.onend = function() {
    console.log('Speech recognition ended.');
    if (recActive) {
        console.log('Restarting recognition...');
        recognition.start();
    }
};

function checkPM() {
    const checkbox = document.querySelector('input[name="Physical\\/Motor"]');
    return checkbox.checked;
}

function checkTTS() {
    const checkbox = document.querySelector('input[name="Vision"]');
    return checkbox.checked;
}

function speakAllText() {
    // Get all visible text from body
    const pageText = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(pageText);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
}

function settings() {
    document.getElementsByClassName("settings")[0].style.display = "block";
}

let recActive = false;
let ttsActive = false;
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
    if(checkTTS()){
        if(!ttsActive){
            speakAllText();
            ttsActive = true;
        }
    } else {
        if(ttsActive){
            window.speechSynthesis.cancel();
        }
    }
}

function showNHL(){
    document.querySelector('.NHL').style.display = 'flex';
    document.querySelector('.NBA').style.display = 'none';
    document.querySelector('.Home').style.display = 'none';
}

function showNBA(){
    document.querySelector('.NHL').style.display = 'none';
    document.querySelector('.NBA').style.display = 'flex';
    document.querySelector('.Home').style.display = 'none';
    if(ttsActive){
        speakAllText();
    }
}

function showHome(){
    document.querySelector('.Home').style.display = 'block';
    document.querySelector('.NHL').style.display = 'none';
    document.querySelector('.NBA').style.display = 'none';
}

function scroll(){
    console.log("Scrolling..."); // Check if it's called
    window.scrollBy(0,300);
}

document.querySelector('.logo').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior (e.g., link navigating)
    scroll(); // Call the scroll function
});

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById("gameWrapper");
    if (!wrapper) return;

    const teamLogos = {
        "Anaheim Ducks": "NHL%20TEAMS/anaheimDucks.png",
        "Arizona Coyotes": "NHL%20TEAMS/arizonaCoyotes.png",
        "Boston Bruins": "NHL%20TEAMS/bostonBruins.png",
        "Buffalo Sabres": "NHL%20TEAMS/buffaloSabres.png",
        "Calgary Flames": "NHL%20TEAMS/calgaryFlames.png",
        "Carolina Hurricanes": "NHL%20TEAMS/carolinaHurricanes.png",
        "Chicago Blackhawks": "NHL%20TEAMS/chicagoBlackhawks.png",
        "Colorado Avalanche": "NHL%20TEAMS/coloradoAvalanche.png",
        "Columbus Blue Jackets": "NHL%20TEAMS/columbusBlueJackets.png",
        "Dallas Stars": "NHL%20TEAMS/dallasStars.png",
        "Detroit Red Wings": "NHL%20TEAMS/detroitRedWings.png",
        "Edmonton Oilers": "NHL%20TEAMS/edmontonOilers.png",
        "Florida Panthers": "NHL%20TEAMS/floridaPanthers.png",
        "Los Angeles Kings": "NHL%20TEAMS/losAngelesKings.png",
        "Minnesota Wild": "NHL%20TEAMS/minnesotaWild.png",
        "Montreal Canadiens": "NHL%20TEAMS/montrealCanadiens.png",
        "Nashville Predators": "NHL%20TEAMS/nashvillePredators.png",
        "New Jersey Devils": "NHL%20TEAMS/newJerseyDevils.png",
        "New York Islanders": "NHL%20TEAMS/newYorkIslanders.png",
        "New York Rangers": "NHL%20TEAMS/newYorkRangers.png",
        "Ottawa Senators": "NHL%20TEAMS/ottawaSenators.png",
        "Philadelphia Flyers": "NHL%20TEAMS/philadelphiaFlyers.png",
        "Pittsburgh Penguins": "NHL%20TEAMS/pittsburghPenguins.png",
        "San Jose Sharks": "NHL%20TEAMS/sanJoseSharks.png",
        "Seattle Kraken": "NHL%20TEAMS/seattleKraken.png",
        "St. Louis Blues": "NHL%20TEAMS/stLouisBlues.png",
        "Tampa Bay Lightning": "NHL%20TEAMS/tampaBayLightning.png",
        "Toronto Maple Leafs": "NHL%20TEAMS/torontoMapleLeafs.png",
        "Vancouver Canucks": "NHL%20TEAMS/vancouverCanucks.png",
        "Vegas Golden Knights": "NHL%20TEAMS/vegasGoldenKnights.png",
        "Washington Capitals": "NHL%20TEAMS/washingtonCapitals.png",
        "Winnipeg Jets": "NHL%20TEAMS/winnipegJets.png"
    };

    const games = [
        { date: "2025-05-07", home: "Toronto Maple Leafs", away: "Florida Panthers", homeScore: 4, awayScore: 3, status: "FINAL" },
        { date: "2025-05-07", home: "Winnipeg Jets", away: "Dallas Stars", homeScore: 2, awayScore: 3, status: "FINAL" },
        { date: "2025-05-08", home: "Washington Capitals", away: "Carolina Hurricanes", homeScore: 3, awayScore: 1, status: "FINAL" },
        { date: "2025-05-08", home: "Vegas Golden Knights", away: "Edmonton Oilers", homeScore: 4, awayScore: 5, status: "FINAL" },
        { date: "2025-05-09", home: "Florida Panthers", away: "Toronto Maple Leafs", homeScore: 5, awayScore: 4, status: "FINAL" },
        { date: "2025-05-09", home: "Winnipeg Jets", away: "Dallas Stars", homeScore: 4, awayScore: 0, status: "FINAL" },
        { date: "2025-05-10", home: "Carolina Hurricanes", away: "Washington Capitals", homeScore: 4, awayScore: 0, status: "FINAL" },
        { date: "2025-05-10", home: "Edmonton Oilers", away: "Vegas Golden Knights", homeScore: 3, awayScore: 4, status: "FINAL" },
        { date: "2025-05-11", home: "Dallas Stars", away: "Winnipeg Jets", homeScore: 5, awayScore: 2, status: "FINAL" },
        { date: "2025-05-11", home: "Florida Panthers", away: "Toronto Maple Leafs", homeScore: 2, awayScore: 0, status: "FINAL" }
    ];

    wrapper.innerHTML = '';

    games.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("Game");
        div.innerHTML = `
            <div class="team">
                <h2>${game.home}</h2>
                <img src="${teamLogos[game.home] || ''}" alt="${game.home}" width="100" height="100">
            </div>
            <h1 class="scoreHome">${game.homeScore}</h1>
            <h3>–</h3>
            <h1 class="scoreAway">${game.awayScore}</h1>
            <div class="team">
                <img src="${teamLogos[game.away] || ''}" alt="${game.away}" width="100" height="100">
                <h2>${game.away}</h2>
            </div>
            <h4 class="finish">${game.status}</h4>
            <h4 class="date">${game.date}</h4>
        `;
        wrapper.appendChild(div);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const nbaWrapper = document.getElementById("nbaGameWrapper");
    if (!nbaWrapper) return;

    const teamLogos = {
        "Atlanta Hawks": "NBA%20TEAMS/atlantaHawks.png",
        "Boston Celtics": "NBA%20TEAMS/bostonCeltics.png",
        "Brooklyn Nets": "NBA%20TEAMS/brooklynNets.png",
        "Charlotte Hornets": "NBA%20TEAMS/charlotteHornets.png",
        "Chicago Bulls": "NBA%20TEAMS/chicagoBulls.png",
        "Cleveland Cavaliers": "NBA%20TEAMS/clevelandCavaliers.png",
        "Dallas Mavericks": "NBA%20TEAMS/dallasMavericks.png",
        "Denver Nuggets": "NBA%20TEAMS/denverNuggets.png",
        "Detroit Pistons": "NBA%20TEAMS/detroitPistons.png",
        "Golden State Warriors": "NBA%20TEAMS/goldenStateWarriors.png",
        "Houston Rockets": "NBA%20TEAMS/houstonRockets.png",
        "Indiana Pacers": "NBA%20TEAMS/indianaPacers.png",
        "LA Clippers": "NBA%20TEAMS/losAngelesClippers.png",
        "Los Angeles Lakers": "NBA%20TEAMS/losAngelesLakers.png",
        "Memphis Grizzlies": "NBA%20TEAMS/memphisGrizzlies.png",
        "Miami Heat": "NBA%20TEAMS/miamiHeat.png",
        "Milwaukee Bucks": "NBA%20TEAMS/milwaukeeBucks.png",
        "Minnesota Timberwolves": "NBA%20TEAMS/minnesotaTimberwolves.png",
        "New Orleans Pelicans": "NBA%20TEAMS/newOrleansPelicans.png",
        "New York Knicks": "NBA%20TEAMS/newYorkKnicks.png",
        "Oklahoma City Thunder": "NBA%20TEAMS/oklahomaCityThunder.png",
        "Orlando Magic": "NBA%20TEAMS/orlandoMagic.png",
        "Philadelphia 76ers": "NBA%20TEAMS/philadelphia76ers.png",
        "Phoenix Suns": "NBA%20TEAMS/phoenixSuns.png",
        "Portland Trail Blazers": "NBA%20TEAMS/portlandTrailBlazers.png",
        "Sacramento Kings": "NBA%20TEAMS/sacramentoKings.png",
        "San Antonio Spurs": "NBA%20TEAMS/sanAntonioSpurs.png",
        "Toronto Raptors": "NBA%20TEAMS/torontoRaptors.png",
        "Utah Jazz": "NBA%20TEAMS/utahJazz.png",
        "Washington Wizards": "NBA%20TEAMS/washingtonWizards.png"
    };

    const today = new Date();
    const endDate = today.toISOString().slice(0, 10);
    today.setDate(today.getDate() - 5);
    const startDate = today.toISOString().slice(0, 10);

    fetch(`https://api.balldontlie.io/v1/games?start_date=${startDate}&end_date=${endDate}`, {
        headers: {
            Authorization: "Bearer 1c92c860-e399-4fee-9409-d1065bab12a9"
        }
    })
        .then(res => res.json())
        .then(data => {
            nbaWrapper.innerHTML = '';
            data.data.forEach(game => {
                let finish;
                if(game.time === null) {
                    finish = "SOON"
                } else if (game.time === "Final"){
                    finish = "FINAL"
                } else {
                    finish = "LIVE"
                }
                const div = document.createElement("div");
                div.classList.add("Game");
                div.innerHTML = `
                <div class="team">
                    <h2>${game.home_team.full_name}</h2>
                    <img src="${teamLogos[game.home_team.full_name] || ''}" alt="${game.home_team.full_name}">
                </div>
                <h1 class="scoreHome">${game.home_team_score}</h1>
                <h3>–</h3>
                <h1 class="scoreAway">${game.visitor_team_score}</h1>
                <div class="team">
                    <img src="${teamLogos[game.visitor_team.full_name] || ''}" alt="${game.visitor_team.full_name}">
                    <h2>${game.visitor_team.full_name}</h2>
                </div>
                <h4 class="finish">${finish}</h4>
                <h4 class="date">${game.date.slice(0, 10)}</h4>
            `;
                nbaWrapper.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error fetching NBA games:", err);
            nbaWrapper.innerHTML = "<p style='color: white; font-weight: normal; font-size: 24pt'>Couldn't load NBA games.</p>";
        });
});
