const data = JSON.parse(sessionStorage.getItem("data"));

function credit(index) {
  const amount = parseInt(prompt("Amount: ", "ex: 100"));
  const playerAtIndex = data.players[index];

  playerAtIndex.balance += amount;
  data.banksBalance -= amount;

  clearAllNode();
  displayBankBalance();
  addNodesForPlayers();
}

function debit(index) {
  const amount = parseInt(prompt("Amount: ", "ex: 100"));
  const playerAtIndex = data.players[index];

  playerAtIndex.balance -= amount;
  data.banksBalance += amount;

  clearAllNode();
  displayBankBalance();
  addNodesForPlayers();
}

window.onload = handleWindowLoad;

function handleWindowLoad() {
  console.log(data);
  delete data.eachPlayerStartingBalance;
  displayBankBalance();
  addNodesForPlayers();
}

function displayBankBalance() {
  const div = document.createElement("div");

  const bankLabel = document.createElement("span");
  bankLabel.innerHTML = "Bank";
  div.appendChild(bankLabel);

  const bankBalanceElement = document.createElement("p");
  bankBalanceElement.innerHTML = `Balance: ${data.banksBalance}`;
  div.appendChild(bankBalanceElement);

  div.classList.add("bank");

  const bankContainerEl = document.getElementById("bank-container");
  bankContainerEl.appendChild(div);
}

function addNodesForPlayers() {
  const playerContainerEl = document.getElementById("player-container");
  const players = data.players;

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

  // create icon elements and append to icon container
  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus-square");
  plusIcon.id = `credit_${index}`;
  plusIcon.setAttribute("onclick", `credit(${index})`);
  iconContainer.appendChild(plusIcon);

  const minusIcon = document.createElement("i");
  minusIcon.classList.add("fas", "fa-minus-square");
  minusIcon.id = `debit_${index}`;
  minusIcon.setAttribute("onclick", `debit(${index})`);
  iconContainer.appendChild(minusIcon);

  div.appendChild(iconContainer);

  div.classList.add("player");

  return div;
}

function clearAllNode() {
  // get reference to containers
  const bankContainer = document.getElementById("bank-container");
  const playerContainer = document.getElementById("player-container");

  // remove child nodes from both containers
  while (bankContainer.firstChild) {
    bankContainer.removeChild(bankContainer.firstChild);
  }

  while (playerContainer.firstChild) {
    playerContainer.removeChild(playerContainer.firstChild);
  }
}
