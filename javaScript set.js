const playingCards = []; //The main array in which all ticket details are stored

// *********** Creating a database of all cards ***************

function card(fileName, color, shape, filling, quantity) {
    this.fileName = fileName;
    this.color = color;
    this.shape = shape;
    this.filling = filling;
    this.quantity = quantity;
};


function constructor() {

    let cardShape = "";
    let cardColor = "";
    let cardFilling = "";
    let quantity = "";

    for (let index = 1; index < 82; index++) {

        //Defines colors for cards:

        switch (true) {
            case (index < 10 || (index > 27 && index < 37) || (index > 54 && index < 64)):
                cardColor = "blue";
                break;
            case ((index > 9 && index < 19) || (index > 36 && index < 46)) || (index > 63 && index < 73):
                cardColor = "green";
                break;
            case ((index > 18 && index < 28) || (index > 45 && index < 55) || (index > 72)):
                cardColor = "red";
                break;
        }

        //Defines shapes for cards:
        switch (true) {
            case (index < 28):
                cardShape = "square";
                break;
            case (index > 27 && index < 55):
                cardShape = "circle";
                break;
            case (index > 54):
                cardShape = "triangle";
                break;
        }

        // Defines filling for cards:

        switch (true) {
            case (index % 3 === 1):
                cardFilling = "full";
                break;
            case (index % 3 === 2):
                cardFilling = "partial";
                break;
            case (index % 3 === 0):
                cardFilling = "none";
                break;
        }

        // Defines quantity for cards:

        switch (true) {
            case (index % 9 === 1):
                quantity = "1";
                break;
            case (index % 9 === 2):
                quantity = "1";
                break;
            case (index % 9 === 3):
                quantity = "1";
                break;
            case (index % 9 === 4):
                quantity = "2";
                break;
            case (index % 9 === 5):
                quantity = "2";
                break;
            case (index % 9 === 6):
                quantity = "2";
                break;
            case (index % 9 === 7):
                quantity = "3";
                break;
            case (index % 9 === 9):
                quantity = "3";
                break;
            case (index % 9 === 0):
                quantity = "3";
                break;
        }

        //Assimilation of fileName, cardColor, cardShape, cardFilling and quantity in the new object:

        let newCard = new card(index.toString(), cardColor, cardShape, cardFilling, quantity);
        playingCards.push(newCard);
    }
};

constructor();

// ************ Up to this point the creation of a database of all the game cards *************


let subArray = [];
let displayedCards = [];
let selectedCards = [];

let computerScore = 0;
let playerScore = 0;
let maxCardsDisplay = 12;

let computerRuntime = 0;

let computerCheckHandle;

let selectedCardByComputerArr = [];





function startGame() {

    if (document.getElementById("startBtn").textContent === "התחל משחק") {

        document.getElementById("startBtn").textContent = "סיים משחק";

        subArray = [...playingCards];

        if (displayedCards.length > 11) {
            displayedCards.splice(0, displayedCards.length);
        }

        document.getElementById("mainPanel").innerHTML = ""; //clean the arena cards

        putCards();

    } else if (document.getElementById("startBtn").textContent === "סיים משחק") {

        location.reload();

    }







};





function putCards() {

    if (subArray.length > 0) {

        while ((maxCardsDisplay - displayedCards.length) > 0) {

            let card = Math.floor(Math.random() * subArray.length);

            displayedCards.push(subArray[card]);
            subArray.splice(card, 1);

            const image = document.createElement('img');
            image.src = "https://raw.githubusercontent.com/avner84/Game-SET/main/Images/" + displayedCards[displayedCards.length - 1].fileName + ".jpg";
            image.id = displayedCards[displayedCards.length - 1].fileName;
            image.style.border = "3px purple solid";
            image.addEventListener("click", addOrRemoveToSelected);
            document.getElementById("mainPanel").appendChild(image);
        }
    }
    checkIfPossible();
};






function addOrRemoveToSelected() {

    if (this.style.borderColor !== "red") {
        if ((this.style.borderColor) === "purple") {
            this.style.border = "8px solid yellow";
            displayedCards.forEach(element => {

                if (element.fileName === this.id) {
                    selectedCards.push(element);
                }
            });

        } else {

            this.style.border = "3px solid purple";
            selectedCards.forEach((element, index) => {

                if (element.fileName === this.id) {
                    selectedCards.splice(index, 1);
                }
            });
        }

        if (selectedCards.length > 2) {
            setTimeout(checkSuccess, 500);
        }
    }

};




function checkIfPossible() {

    var i, j, k;

    loop1: for (i = 0; i < displayedCards.length - 2; i++) {

        loop2: for (j = i + 1; j < displayedCards.length - 1; j++) {

            loop3: for (k = j + 1; k < displayedCards.length; k++) {

                if (checkingCards(displayedCards[i], displayedCards[j], displayedCards[k])) {

                    console.log(displayedCards[i]);
                    console.log(displayedCards[j]);
                    console.log(displayedCards[k]);
                    console.log("It's possible");

                    if (selectedCardByComputerArr.length > 0) {

                        selectedCardByComputerArr.splice(0, selectedCardByComputerArr.length);

                    }

                    selectedCardByComputerArr = [displayedCards[i], displayedCards[j], displayedCards[k]];

                    computerRuntime = Math.floor(Math.random() * 18000) + 9000;
                    computerCheckHandle = setTimeout(computerCheck, computerRuntime);



                    return true;
                    break loop1;
                }

                if ((i === displayedCards.length - 3) && (j === displayedCards.length - 2) && (k === displayedCards.length - 1) && (!checkingCards(displayedCards[i], displayedCards[j], displayedCards[k]))) {

                    console.log("i: " + i + "; j: " + j + "; k:" + k);
                    console.log("It's not possible");

                    if (subArray.length > 0) {

                        setTimeout(function() {
                            alert("אופס! נראה שאין אפשרויות ליצירת סט. הקש אישור להוספת קלפים נוספים");
                            maxCardsDisplay = 15;
                            document.getElementById("mainPanel").style.gridTemplateColumns = "auto auto auto auto auto";
                            putCards();
                        }, 1000)

                    } else if (subArray.length === 0) {
                        whoIsWinner();
                    }
                }
            }
        }
    }
};

function checkingCards(card1, card2, card3) {

    if (
        (
            ((card1.shape === card2.shape) && (card2.shape === card3.shape)) ||
            ((card1.shape !== card2.shape) && (card2.shape !== card3.shape) && (card1.shape !== card3.shape))
        ) &&
        (
            ((card1.color === card2.color) && (card2.color === card3.color)) ||
            ((card1.color !== card2.color) && (card2.color !== card3.color) && (card1.color !== card3.color))
        ) &&
        (
            ((card1.filling === card2.filling) && (card2.filling === card3.filling)) ||
            ((card1.filling !== card2.filling) && (card2.filling !== card3.filling) && (card1.filling !== card3.filling))
        ) &&
        (
            ((card1.quantity === card2.quantity) && (card2.quantity === card3.quantity)) ||
            ((card1.quantity !== card2.quantity) && (card2.quantity !== card3.quantity) && (card1.quantity !== card3.quantity))
        )
    ) {
        return true;
    } else {
        return false;
    }
};



function checkSuccess() {

    if (checkingCards(selectedCards[0], selectedCards[1], selectedCards[2])) {

        alert("הצלחת!")
        playerScore++;
        removeSetCards(selectedCards);

    } else {

        alert("טעות. נסה שוב")
        selectedCards.forEach(element => {
            let selectImages = document.getElementById(element.fileName);
            selectImages.style.border = "3px purple solid";
        });

        selectedCards.splice(0, selectedCards.length);
    }
};




function removeSetCards(arr) {
    if (computerRuntime > 0) {
        clearTimeout(computerCheckHandle); //In case there is a set and need to delete the cards, stop the computer from searching for a set
    };
    while (arr.length > 0) {

        displayedCards.forEach((displayedCardsElement, displayedCardsIndex) => {

            if (arr[arr.length - 1] === displayedCardsElement) {

                let removeImage = document.getElementById(arr[arr.length - 1].fileName);
                removeImage.parentNode.removeChild(removeImage);

                displayedCards.splice(displayedCardsIndex, 1);
                arr.splice(arr.length - 1, 1);

            }
        });

    }

    if (maxCardsDisplay > 12) {

        maxCardsDisplay = 12;
        document.getElementById("mainPanel").style.gridTemplateColumns = "auto auto auto auto";
    }
    scoreRating();

    if (displayedCards.length === 0) {
        whoIsWinner();

    } else {
        setTimeout(putCards, 800);
    }
};






function scoreRating() {
    document.getElementById("leftPanel").innerHTML = "  הישגת" + " " + playerScore + " " + "סטים.  " + "<br />" + "  המחשב השיג" + " " + computerScore + " " + "סטים.  "
};






function whoIsWinner() {

    if (computerScore > playerScore) {
        document.getElementById("leftPanel").innerHTML += "<br /><h3>אין אפשרויות נוספות</h3><br /><h1> המחשב ניצח</h1>";
    } else if (computerScore < playerScore) {
        document.getElementById("leftPanel").innerHTML += "<br /><h3>אין אפשרויות נוספות</h3><br /><h1>כל הכבוד! ניצחת!</h1>";
    } else if (computerScore === playerScore) {
        document.getElementById("leftPanel").innerHTML += "<br /><h3>אין אפשרויות נוספות</h3><br /><h1>נראה שהושג תיקו בינך לבין המחשב</h1>";
    }

};





function computerCheck() {
    computerRuntime = 0;

    selectedCardByComputerArr.forEach(element => {
        document.getElementById(element.fileName).style.border = "8px solid Red";
    });

    selectedCardByComputerArr.forEach(element => { //Checks if a card selected by the computer is in the player's array and if so it deletes it
        selectedCards.forEach((selectedCardsElement, index) => {

            if (selectedCardsElement === element) {
                selectedCards.splice(index, 1);
            }
        });
    });

    computerScore++;

    setTimeout(function() {
        removeSetCards(selectedCardByComputerArr);
    }, 2000);


};
