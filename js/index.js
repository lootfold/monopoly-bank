let eachPlayerStartingBalance = 1500;

// object to store game data
data = {
  noOfPlayers: 0,
  banksBalance: 20580,
  players: [],
};

window.onload = handleWindowLoad;

function handleWindowLoad() {
  // get form ref & add event handlers for forms

  const balanceForm = document.forms.gameDetails;
  balanceForm.onsubmit = handleGameDetailsSubmit;

  const playersForm = document.forms.playersForm;
  playersForm.onsubmit = handlePlayersFormSubmit;

  addEventListenersForValidation(balanceForm);

  function handleGameDetailsSubmit() {
    // store balance input to game data
    eachPlayerStartingBalance = parseInt(balanceForm.playerBalance.value);
    data.banksBalance = parseInt(balanceForm.totalAmount.value);
    data.noOfPlayers = parseInt(balanceForm.noOfPlayers.value);
    data.banksBalance -= data.noOfPlayers * eachPlayerStartingBalance;

    // display form to get player details
    displayFieldsForPlayers();

    return false;
  }

  function handlePlayersFormSubmit() {
    // get ref to all player elements
    const elements = playersForm.elements;

    // loop through form elements and store player name with balance to game data
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // get name form text input
      if (element.type === "text") {
        data.players.push({
          name: element.value,
          balance: eachPlayerStartingBalance,
        });
      }
    }

    // save game data in session storage
    localStorage.setItem("data", JSON.stringify(data));

    // navigate to banker page
    window.location.href = "banker.html";

    return false;
  }

  function displayFieldsForPlayers() {
    // display form for player names
    playersForm.classList.remove("hidden");

    // clear all fields in the form
    const playersInputContainer = document.getElementById(
      "playersFormInputContainer"
    );
    playersInputContainer.innerHTML = "";

    // generate new fileds based on the input & add to page
    for (let i = 1; i <= data.noOfPlayers; i++) {
      const field = generatePlayerInput(i);
      playersInputContainer.appendChild(field);
    }

    addEventListenersForValidation(playersForm);
  }

  function generatePlayerInput(playerNo) {
    const idStr = "player";
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("form__group");

    // create label
    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", `${idStr}_${playerNo}}`);
    inputLabel.innerText = `Player ${playerNo}`;
    inputLabel.classList.add("form__label");

    // create text field for player name
    const inputField = document.createElement("input");
    inputField.id = `${idStr}_${playerNo}}`;
    inputField.name = `${idStr}_${playerNo}}`;
    inputField.type = "text";
    inputField.required = true;
    inputField.minLength = 3;
    inputField.maxLength = 20;
    inputField.classList.add("form__control");

    // add fields to div & apply style
    inputDiv.appendChild(inputLabel);
    inputDiv.appendChild(inputField);
    inputDiv.classList.add("form-group");

    return inputDiv;
  }
}
