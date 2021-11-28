let eachPlayerStartingBalance;

// object to store game data
data = {
  noOfPlayers: 0,
  banksBalance: 0,
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

  function addEventListenersForValidation(form) {
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== "submit") {
        // show error style when user leaves the input field
        element.onblur = validateField;

        // remove error style if the value is valid as the user is typing
        element.onkeyup = clearErrorStyle;
      }
    }

    function validateField() {
      if (this.checkValidity()) {
        this.classList.remove("error");
      } else {
        this.classList.add("error");
      }
    }

    function clearErrorStyle() {
      if (this.checkValidity()) {
        this.classList.remove("error");
      }
    }
  }

  function handleGameDetailsSubmit() {
    // store balance input to game data
    data.banksBalance = parseInt(balanceForm.bankBalance.value);
    eachPlayerStartingBalance = parseInt(balanceForm.playerBalance.value);
    data.noOfPlayers = parseInt(balanceForm.noOfPlayers.value);

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
    sessionStorage.setItem("data", JSON.stringify(data));

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
