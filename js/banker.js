const data = JSON.parse(sessionStorage.getItem("data"));

function credit(index) {
  // ask user to input credit amount
  const creditAmount = parseInt(
    prompt("Yay!! you get money from the bank.\nEnter the amount : ", "ex: 100")
  );

  if (!creditAmount) {
    alert("Invalid value :(\nTry again!!");
    return;
  }

  // validate credit amount
  if (data.banksBalance < creditAmount) {
    alert("OOPS!! Looks like the bank is empty.");
    return;
  }

  // transfer amount from bank to player
  const playerAtIndex = data.players[index];
  playerAtIndex.balance += creditAmount;
  data.banksBalance -= creditAmount;

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
}

function debit(index) {
  // ask user to input debit amount
  const debitAmount = parseInt(prompt("Amount: ", "ex: 100"));

  if (!debitAmount) {
    alert("Invalid value :(\nTry again!!");
    return;
  }

  const playerAtIndex = data.players[index];

  // validate debit amount
  if (playerAtIndex.balance < debitAmount) {
    alert("OOPS!! Looks like you don't have enough balance. :(");
    return;
  }

  // transfer amount from player to bank
  playerAtIndex.balance -= debitAmount;
  data.banksBalance += debitAmount;

  // rerender all nodes
  clearAllNode();
  addNodeForBank();
  addNodesForPlayers();
}

window.onload = handleWindowLoad;

function handleWindowLoad() {
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
  const bankContainer = document.getElementById("bankContainer");
  const playerContainer = document.getElementById("playerContainer");

  bankContainer.innerHTML = playerContainer.innerHTML = "";
}
