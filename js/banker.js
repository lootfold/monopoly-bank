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
  delete data.eachPlayerStartingBalance;
  displayBankBalance();
  addNodesForPlayers();
}

function displayBankBalance() {
  const div = document.createElement("div");

  const bankLabel = document.createElement("p");
  bankLabel.innerHTML = "Bank";
  div.appendChild(bankLabel);

  const bankBalanceElement = document.createElement("p");
  bankBalanceElement.innerHTML = `Balance: ${data.banksBalance}`;
  div.appendChild(bankBalanceElement);

  const mainNode = document.querySelector("main");
  mainNode.appendChild(div);
}

function addNodesForPlayers() {
  const mainNode = document.querySelector("main");
  const players = data.players;

  for (let i = 0; i < players.length; i++) {
    const node = generateNodeForPlayer(i, players[i]);
    mainNode.appendChild(node);
  }
}

function generateNodeForPlayer(index, player) {
  const div = document.createElement("div");

  const playerNameElement = document.createElement("span");
  playerNameElement.innerHTML = player.name;
  div.appendChild(playerNameElement);

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("fas", "fa-plus-square");
  plusIcon.id = `credit_${index}`;
  plusIcon.setAttribute("onclick", `credit(${index})`);
  div.appendChild(plusIcon);

  const minusIcon = document.createElement("i");
  minusIcon.classList.add("fas", "fa-minus-square");
  minusIcon.id = `debit_${index}`;
  minusIcon.setAttribute("onclick", `debit(${index})`);
  div.appendChild(minusIcon);

  const playerBalanceElement = document.createElement("p");
  playerBalanceElement.innerHTML = `Balance: ${player.balance}`;
  div.appendChild(playerBalanceElement);

  return div;
}

function clearAllNode() {
  const main = document.querySelector("main");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}
