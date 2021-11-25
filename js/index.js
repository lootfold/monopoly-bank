let balanceForm;
let noOfPlayersForm;
let playersForm;

// object to store game data
data = {
  noOfPlayers: 0,
  banksBalance: 0,
  eachPlayerStartingBalance: 0,
  players: [],
};

window.onload = handleWindowLoad;

function handleWindowLoad() {
  // get form ref & add event handlers for forms

  balanceForm = document.getElementById("form_bank_balance");
  balanceForm.onsubmit = handleBalanceFormSubmit;

  noOfPlayersForm = document.getElementById("form_no_of_players");
  noOfPlayersForm.onsubmit = handleNoOfPlayersFormSubmit;

  playersForm = document.getElementById("form_players_names");
  playersForm.onsubmit = handlePlayersFormSubmit;
}

function handleBalanceFormSubmit() {
  // store balance input to game data
  data.banksBalance = parseInt(balanceForm.bank_balance.value);
  data.eachPlayerStartingBalance = parseInt(balanceForm.player_balance.value);

  // display form to enter no of players
  noOfPlayersForm.classList.remove("hidden");
  return false;
}

function handleNoOfPlayersFormSubmit() {
  // store no of players to game data
  data.noOfPlayers = parseInt(noOfPlayersForm.no_of_players.value);

  // display form to input player details
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
        balance: data.eachPlayerStartingBalance,
      });
    }
  }

  // save game data in session storage
  sessionStorage.setItem("data", JSON.stringify(data));

  // navigate to banker page
  window.location.href = "banker.html";

  return false;
}

function displayFieldsForPlayers() {
  // display form for player names
  const playersForm = document.getElementById("form_players_names");
  playersForm.classList.remove("hidden");

  // clear all fields in the form
  const playersInputContainer = document.getElementById(
    "player_inputs_container"
  );
  playersInputContainer.innerHTML = "";

  // generate new fileds based on the input & add to page
  for (let i = 1; i <= data.noOfPlayers; i++) {
    const field = generatePlayerInput(i);
    playersInputContainer.appendChild(field);
  }
}

function generatePlayerInput(playerNo) {
  const idStr = "player";
  const inputDiv = document.createElement("div");

  // create label
  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", `${idStr}_${playerNo}}`);
  inputLabel.innerText = `Player ${playerNo}`;

  // create text field for player name
  const inputField = document.createElement("input");
  inputField.id = `${idStr}_${playerNo}}`;
  inputField.name = `${idStr}_${playerNo}}`;
  inputField.type = "text";
  inputField.required = true;
  inputField.minLength = 3;
  inputField.maxLength = 20;

  // add fields to div & apply style
  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(inputField);
  inputDiv.classList.add("form-group");

  return inputDiv;
}
