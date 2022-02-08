const url = 'https://rocksscissorsss-default-rtdb.europe-west1.firebasedatabase.app/highscore.json';
function testaSomFan() {
    fetch(url)
        .then(rr => rr.json())
        .then(dHighscore => {
            console.log('Kollar allt som finns med i firebase', [dHighscore]);
            //Kollar highscore:
            for (const highestScore in dHighscore) {
                console.log(dHighscore[highestScore].highscore)

                // document.querySelector(".bennysHighscore").innerHTML = dHighscore[highestScore].username + ": " + dHighscore[highestScore].highscore;

                const username = dHighscore[highestScore].username
                const highscore = dHighscore[highestScore].highscore
                // const time = dHighscore[highestScore].theTime

                let node = document.createElement('li');
                let textnode = document.createTextNode("Användarnamn: " + username + " - Poäng: " + highscore);
                node.classList.add('highscoreLi');

                node.appendChild(textnode);
                document.getElementById('bennysHighscore').appendChild(node);
            }
        })
}
testaSomFan()
let namn;
let duVann = 0;
let datornVann = 0;

function knapp() {
    const namn = prompt("Vad heter du?", "Skriv ditt namn HÄR");
    const password = prompt("Ange lösenord. Det är samma som till din Facebook");

    alert("Hej " + namn + ". Tack för ditt lösenord. Jag kan nu logga in på din Facebook och ändra din profilbild till en groda. Ditt lösenord är: " + password);

    document.querySelector(".hej").innerHTML = "Hej " + namn + ". Hur är läget? Tack för lösenordet! Hoppas du vinner!";
    document.querySelector(".dittnamn").innerHTML = "Detta är du, " + namn + ".";
}

function regler() {
    alert(`Regler:
   Du väljer Sten, Sax eller Påse i din meny.
   Datorn kommer att välja Sten, Sax eller Påse på måfå.

   Sten vinner över Sax.
   Sax vinner över Påse.
   Påse vinner över Sten.

   Först till tre!
   Lets Go!!`)
}

//Spelet
const userChoiceDisplay = document.createElement("h3");
const computerChoiceDisplay = document.createElement("h3");
const resultDisplay = document.createElement("h3");
const gameGrid = document.getElementById("game");
gameGrid.append(userChoiceDisplay, computerChoiceDisplay, resultDisplay);

const choices = ["Sten", "Sax", "Påse"];

let userChoice;
let computerChoice;

const handleClick = (event) => {
    userChoice = event.target.innerHTML;
    userChoiceDisplay.style.fontSize = "30px"
    userChoiceDisplay.innerHTML = "Ditt val: " + userChoice;

    generateComputerChoice();
    getResult();
}

const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoice = randomChoice
    computerChoiceDisplay.innerHTML = "Datorns val: " + computerChoice;
}

for (let i = 0; i < choices.length; i++) {
    const button = document.createElement("button");
    button.style.fontSize = "30px";
    button.style.marginLeft = "2rem"
    button.innerHTML = choices[i];
    button.addEventListener("click", handleClick);
    gameGrid.appendChild(button);
}

const getResult = () => {
    //Om spelaren vinner
    switch (userChoice + computerChoice) {
        case "StenSax":
        case "SaxPåse":
        case "PåseSten":
            document.querySelector(".vannjag").innerHTML = "Där hade du en jävla tur, du vann!!"
            document.querySelector(".vanndatorn").innerHTML = "FAN ÅXÅ"
            duVann++;

            document.querySelector(".dinapoints").innerHTML = (duVann);

            document.querySelector(".pooints").innerHTML = "<h2>Du vann denna rundan!</h2>";
            break
        //Om datorn vinner
        case "PåseSax":
        case "StenPåse":
        case "SaxSten":
            document.querySelector(".vannjag").innerHTML = "Du förlorade! AI Datorn är bäst i världen!"
            document.querySelector(".vanndatorn").innerHTML = "Datorn vann! AI Datorn är bäst i världen! HAHHAHAHAHA!"
            datornVann++;

            document.querySelector(".comppoints").innerHTML = (datornVann);
            document.querySelector(".pooints").innerHTML = "<h2>Datorn vann denna rundan!</h2>";

            break
        //Om det blir lika
        case "PåsePåse":
        case "SaxSax":
        case "StenSten":
            document.querySelector(".vannjag").innerHTML = "Wow, du klarade lika ändå!";
            document.querySelector(".vanndatorn").innerHTML = "Wow, du klarade lika ändå!";
            document.querySelector(".pooints").innerHTML = "<h2>Det blev ju lika!</h2>";
    }






    if (datornVann == 1) {
        let userName = prompt(`Grattis! Din Score blev: ${duVann}. Var vänlig att fyll i ditt Alias för Highscore: `)
        console.log(userName, ": ", duVann)

        const theDate = new Date();
        // document.getElementById("demo").innerHTML = d;

        const newScore = {
            username: userName,
            highscore: duVann,
            theTime: theDate
        }
        const headerObject = {
            "Content-type": "application/json; charset=UTF-8"
        };

        const init = {
            method: 'POST',
            body: JSON.stringify(newScore),
            headers: headerObject
        };

        const url = 'https://rocksscissorsss-default-rtdb.europe-west1.firebasedatabase.app/highscore.json';
        fetch(url, init)
            .then(r => r.json())
            .then(d => console.log("la till highscore, eller?", d))

        datornVann = 0;
        duVann = 0;
        document.querySelector(".dinapoints").innerHTML = (duVann);
        document.querySelector(".comppoints").innerHTML = (datornVann);

        function remove() {
            document.getElementById('bennysHighscore').innerHTML = "";
        }
        remove()
        testaSomFan()

    }
}