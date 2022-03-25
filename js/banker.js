const data = JSON.parse(localStorage.getItem("data"));
const CREDIT = "CREDIT";
const DEBIT = "DEBIT";
let transactionType;
let playerForTransaction;
let amountForTransaction;
let amountForm;

window.onload = handleWindowLoad;

function handleWindowLoad() {
  // display data
  addNodeForBank();
  addNodesForPlayers();

  amountForm = document.forms.amountForm;
  amountForm.onsubmit = handleAmountFormSubmit;
  amountForm.onreset = hideAmountForm;
  addEventListenersForValidation(amountForm);
}

function handleAmountFormSubmit() {
  amountForTransaction = parseInt(amountForm.amount.value);

  let message = "";
  if (transactionType == CREDIT) {
    message = credit();
  } else if (transactionType == DEBIT) {
    message = debit();
  }

  displayMessage(message);

  return false;
}

// called on + button click
// takes player index as parameter
function handleCreditClick(index) {
  transactionType = CREDIT;
  playerForTransaction = index;
  showAmountForm();
}

// called on - button click
// takes player index as parameter
function handleDebitClick(index) {
  transactionType = DEBIT;
  playerForTransaction = index;
  showAmountForm();
}

function credit() {
  // validate credit amount
  if (data.banksBalance < amountForTransaction) {
    return "OOPS!! Looks like the bank doesn't have enough balance.";
  }

  // transfer amount from bank to player
  const playerAtIndex = data.players[playerForTransaction];
  playerAtIndex.balance += amountForTransaction;
  data.banksBalance -= amountForTransaction;

  // save game date
  localStorage.setItem("data", JSON.stringify(data));

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
  hideAmountForm();

  return "Success";
}

function debit() {
  const playerAtIndex = data.players[playerForTransaction];

  // validate debit amount
  if (playerAtIndex.balance < amountForTransaction) {
    return "OOPS!! Looks like you don't have enough balance. :(";
  }

  // transfer amount from player to bank
  playerAtIndex.balance -= amountForTransaction;
  data.banksBalance += amountForTransaction;

  // save game date
  localStorage.setItem("data", JSON.stringify(data));

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
  hideAmountForm();

  return "Success";
}

function addNodeForBank() {
  const div = document.createElement("div");

  // create element to display bank label
  const bankLabel = document.createElement("span");
  bankLabel.innerHTML = "Bank";
  div.appendChild(bankLabel);

  // create element to display bank's balance
  const bankBalanceElement = document.createElement("p");
  bankBalanceElement.innerHTML = `Balance: ${data.banksBalance}`;
  div.appendChild(bankBalanceElement);

  // apply style
  div.classList.add("bank");

  // add element to page
  const bankContainerEl = document.getElementById("bankContainer");
  bankContainerEl.appendChild(div);
}

function addNodesForPlayers() {
  // get ref to player container element
  const playerContainerEl = document.getElementById("playerContainer");
  const players = data.players;

  // generate player nodes and add to the page
  for (let i = 0; i < players.length; i++) {
    const node = generateNodeForPlayer(i, players[i]);
    playerContainerEl.appendChild(node);
  }
}

function generateNodeForPlayer(index, player) {
  const div = document.createElement("div");

  // create span for player name
  const playerNameElement = document.createElement("span");
  playerNameElement.innerHTML = `${index + 1}. ${player.name}`;
  div.appendChild(playerNameElement);

  // create p for player balance
  const playerBalanceElement = document.createElement("p");
  playerBalanceElement.innerHTML = `Balance: ${player.balance}`;
  div.appendChild(playerBalanceElement);

  // create div to contain icon
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icons-container");

  // create + icon elements and add to icon container
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus-square");
  plusIcon.id = `credit_${index}`;
  // set onclick attribute and pass player index as param
  plusIcon.setAttribute("onclick", `handleCreditClick(${index})`);
  iconContainer.appendChild(plusIcon);

  // create - icon elements and add to icon container
  const minusIcon = document.createElement("i");
  minusIcon.classList.add("fas", "fa-minus-square");
  minusIcon.id = `debit_${index}`;
  // set onclick attribute and pass player index as param
  minusIcon.setAttribute("onclick", `handleDebitClick(${index})`);
  iconContainer.appendChild(minusIcon);

  // add icon container to player node
  div.appendChild(iconContainer);

  // apply style to player node
  div.classList.add("player");

  return div;
}

function clearAllNode() {
  // get reference to containers
  const bankContainer = document.getElementById("bankContainer");
  const playerContainer = document.getElementById("playerContainer");

  bankContainer.innerHTML = playerContainer.innerHTML = "";
}

function showAmountForm() {
  amountForm.classList.remove("hidden");
}

function hideAmountForm() {
  amountForm.classList.add("hidden");
  playerForTransaction = 0;
  amountForTransaction = 0;
  amountForm.amount.value = null;
  return false;
}

function displayMessage(message) {
  const messageEl = document.getElementById("message");
  messageEl.classList.remove("hidden");
  messageEl.innerHTML = message;
}
