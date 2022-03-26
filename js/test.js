const testEl = document.getElementById("testResults");

function setUpTestData() {
  const testData = {
    noOfPlayers: 2,
    banksBalance: 17580,
    players: [
      { name: "One", balance: 1500 },
      { name: "Two", balance: 1500 },
    ],
  };

  localStorage.setItem("data", JSON.stringify(testData));
}

function shouldReturnErrorForCreditTransactionIfBankDoesNotHaveEnoughBalance() {
  const testDesc =
    "Should Return Error For Credit Transaction If Bank Does Not Have Enough Balance";
  // set variables for test

  // set amount that is more than bank's balance
  amountForTransaction = 20000;

  // select player with index 0
  playerForTransaction = 0;

  const expectedMessage =
    "OOPS!! Looks like the bank doesn't have enough balance.";

  // call credit function to transfer amount from bank to player
  const result = credit();

  if (expectedMessage == result) {
    testEl.innerHTML += `<li>${testDesc} : Pass</li>`;
  } else {
    testEl.innerHTML += `<li>${testDesc} : Fail</li>`;
  }
}

function shouldReturnErrorForDebitIfPlayerDoesNotHaveEnoughBalance() {
  const testDesc =
    "Should Return Error For Debit If Player Does Not Have Enough Balance";
  // set variables for test

  // select player with index 0
  playerForTransaction = 0;

  // set amount that is more than selected player's balance
  amountForTransaction = 20000;

  const expectedMessage = "OOPS!! Looks like you don't have enough balance. :(";

  //  call debit to transfer amount from player to bank
  const result = debit();

  if (expectedMessage == result) {
    testEl.innerHTML += `<li>${testDesc} : Pass</li>`;
  } else {
    testEl.innerHTML += `<li>${testDesc} : Fail</li>`;
  }
}

function shouldReturnSuccessIfPlayerHasEnoughBalance() {
  const testDesc =
    "Should Return Success for debit if player has enough balance";

  // set variables for test
  // select player with index 0
  playerForTransaction = 0;
  amountForTransaction = 20;

  const expectedMessage = "Success";

  // call debit to transfer amount from player to bank
  const result = debit();

  if (expectedMessage == result) {
    testEl.innerHTML += `<li>${testDesc} : Pass</li>`;
  } else {
    testEl.innerHTML += `<li>${testDesc} : Fail</li>`;
  }
}

function shouldReturnSuccessIfBankHasEnoughBalance() {
  const testDesc = "Should Return Success for debit if bank has enough balance";
  // set variables for test
  // select player with index 0
  playerForTransaction = 0;
  amountForTransaction = 20;

  const expectedMessage = "Success";

  // call credit to transfer amount from bank to player
  const result = credit();

  if (expectedMessage == result) {
    testEl.innerHTML += `<li>${testDesc} : Pass</li>`;
  } else {
    testEl.innerHTML += `<li>${testDesc} : Fail</li>`;
  }
}

function runTests() {
  setUpTestData();
  shouldReturnErrorForCreditTransactionIfBankDoesNotHaveEnoughBalance();
  shouldReturnErrorForDebitIfPlayerDoesNotHaveEnoughBalance();
  shouldReturnSuccessIfPlayerHasEnoughBalance();
  shouldReturnSuccessIfBankHasEnoughBalance();
}

// wait for banker js to complete setup before running tests
setTimeout(() => {
  runTests();
}, 2000);
