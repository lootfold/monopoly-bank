const data = JSON.parse(sessionStorage.getItem("data"));

function credit(index) {
  // ask user to input credit amount
  const amount = parseInt(prompt("Amount: ", "ex: 100"));

  // transfer amount from bank to player
  const playerAtIndex = data.players[index];
  playerAtIndex.balance += amount;
  data.banksBalance -= amount;

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
}

function debit(index) {
  // ask user to input debit amount
  const amount = parseInt(prompt("Amount: ", "ex: 100"));

  // transfer amount from player to bank
  const playerAtIndex = data.players[index];
  playerAtIndex.balance -= amount;
  data.banksBalance += amount;

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
}

window.onload = handleWindowLoad;

function handleWindowLoad() {
  // remove unnecessary prop
  delete data.eachPlayerStartingBalance;

  // display data
  addNodeForBank();
  addNodesForPlayers();
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
  const bankContainerEl = document.getElementById("bank-container");
  bankContainerEl.appendChild(div);
}

function addNodesForPlayers() {
  // get ref to player container element
  const playerContainerEl = document.getElementById("player-container");
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
  plusIcon.setAttribute("onclick", `credit(${index})`);
  iconContainer.appendChild(plusIcon);

  // create - icon elements and add to icon container
  const minusIcon = document.createElement("i");
  minusIcon.classList.add("fas", "fa-minus-square");
  minusIcon.id = `debit_${index}`;
  minusIcon.setAttribute("onclick", `debit(${index})`);
  iconContainer.appendChild(minusIcon);

  // add icon container to player node
  div.appendChild(iconContainer);

  // apply style to player node
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
