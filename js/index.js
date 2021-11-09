let balanceForm;
let noOfPlayersForm;
let playersForm;

data = {
  noOfPlayers: 0,
  banksBalance: 0,
  eachPlayerStartingBalance: 0,
  players: [],
};

window.onload = handleWindowLoad;

function handleWindowLoad() {
  balanceForm = document.getElementById("form_bank_balance");
  balanceForm.onsubmit = handleBalanceFormSubmit;

  noOfPlayersForm = document.getElementById("form_no_of_players");
  noOfPlayersForm.onsubmit = handleNoOfPlayersFormSubmit;

  playersForm = document.getElementById("form_players_names");
  playersForm.onsubmit = handlePlayersFormSubmit;
}

function handleBalanceFormSubmit() {
  data.banksBalance = parseInt(balanceForm.bank_balance.value);
  data.eachPlayerStartingBalance = parseInt(balanceForm.player_balance.value);

  noOfPlayersForm.classList.remove("hidden");
  return false;
}

function handleNoOfPlayersFormSubmit() {
  data.noOfPlayers = parseInt(noOfPlayersForm.no_of_players.value);

  displayFieldsForPlayers();

  return false;
}

function handlePlayersFormSubmit() {
  const elements = playersForm.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.type === "text") {
      data.players.push({
        name: element.value,
        balance: data.eachPlayerStartingBalance,
      });
    }
  }

  sessionStorage.setItem("data", JSON.stringify(data));
  window.location.href = "banker.html";
  return false;
}

function displayFieldsForPlayers() {
  const playersForm = document.getElementById("form_players_names");
  playersForm.classList.remove("hidden");

  const playersInputContainer = document.getElementById(
    "player_inputs_container"
  );
  playersInputContainer.innerHTML = "";

  for (let i = 1; i <= data.noOfPlayers; i++) {
    const field = generatePlayerInput(i);
    playersInputContainer.appendChild(field);
  }
}

function generatePlayerInput(playerNo) {
  const idStr = "player";
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("form-group");

  const inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", `${idStr}_${playerNo}}`);
  inputLabel.innerText = `Player ${playerNo}`;

  const inputField = document.createElement("input");
  inputField.id = `${idStr}_${playerNo}}`;
  inputField.name = `${idStr}_${playerNo}}`;
  inputField.type = "text";
  inputField.required = true;
  inputField.minLength = 3;
  inputField.maxLength = 20;

  const validIcon = document.createElement("i");
  validIcon.classList.add("hidden", "fas", "fa-check", "valid-icon");

  inputDiv.appendChild(inputLabel);
  inputDiv.appendChild(inputField);
  inputDiv.appendChild(validIcon);

  return inputDiv;
}
