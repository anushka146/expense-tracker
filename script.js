//calling every html element from html file whose value we need or to change and storing them in variables.
const balanceEl = document.getElementById("balance");//the current balance
const incomeEl = document.getElementById("income");//the current income
const expenseEl = document.getElementById("expense");//the current expenses till now
const listEl = document.getElementById("list");//the list in which all the transactions will be shown
//taking variables of form inputs
const amountEl = document.getElementById("amount");//amount which user entered
const typeEl = document.getElementById("type");//type user selected whether income or expense
const categoryEl = document.getElementById("category");//user selected category of transaction
const addBtn = document.getElementById("addBtn");//the add button
//our array of transactions that is storing all the transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];//getting transactions array from local storage if it exists else initializing it to empty array.

// Add transaction
addBtn.addEventListener("click", function () {//when user clicks add button
  const amount = Number(amountEl.value);//the above shown amount is converted to user input number.
  const type = typeEl.value;//the type of transaction selected by user
  const category = categoryEl.value;//the category selected by user

  if (amount <= 0) {//if user enters invalid amount
    alert("Please enter a valid amount");
    return;
  }

  const transaction = {
    id: Date.now(),//unique key for each transaction for identification during deletion
    amount,
    type,
    category
  };

  transactions.push(transaction);//pushing the new transaction to transactions array
  updateLocalStorage();//updating local storage with new transactions array
  updateUI();//updating the UI to reflect new transaction

  amountEl.value = "";//clearing the amount input field after adding transaction
});

// Update UI
function updateUI() {
  listEl.innerHTML = "";//clearing the list element to avoid duplication

  let income = 0;//initializing income to 0
  let expense = 0;
  for (let i = 0; i < transactions.length; i++) {
  const txn = transactions[i]; // current transaction

  const li = document.createElement("li"); //creating a new list item for each transaction
  li.classList.add(txn.type); //adding class based on transaction type for styling
  // keep your template literal version
  li.innerHTML = `
    ${txn.category} - ₹${txn.amount}
    <button class="delete" onclick="deleteTransaction(${txn.id})">X</button>
`;//setting inner html of our new li item to show category, amount and delete button html which has a onclick event to delete the transaction(used template literals for easy embedding of variables here)

  listEl.appendChild(li); //appending the new list item to the list element

  // update totals
  if (txn.type === "income") income += txn.amount;
  else expense += txn.amount;
}
  balanceEl.innerText = income - expense;//updating balance
  incomeEl.innerText = income;//updating income to be shown on UI
  expenseEl.innerText = expense;//updating expense
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);//keeps all transactions except the one with the given id
  updateLocalStorage();
  updateUI();
}

// LocalStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));//storing the updated transactions array in local storage
}

// Initial load
updateUI();
