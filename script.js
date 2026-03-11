let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = localStorage.getItem("budget") || 0;

document.getElementById("remaining").innerText = budget;

function setBudget(){

let value = document.getElementById("budgetInput").value;

if(value === "") return;

budget = Number(value);

localStorage.setItem("budget", budget);

updateScreen();
}

function addExpense(){

let category = document.getElementById("category").value;
let custom = document.getElementById("customCategory").value;
let amount = document.getElementById("amount").value;

if(amount === "") return;

if(category === "Other" && custom !== ""){
category = custom;
}

expenses.push({
category: category,
amount: Number(amount)
});

localStorage.setItem("expenses", JSON.stringify(expenses));

document.getElementById("amount").value="";
document.getElementById("customCategory").value="";

updateScreen();
}

function deleteExpense(i){

expenses.splice(i,1);

localStorage.setItem("expenses", JSON.stringify(expenses));

updateScreen();
}

function editExpense(i){

let newAmount = prompt("Enter new amount");

if(newAmount === null) return;

expenses[i].amount = Number(newAmount);

localStorage.setItem("expenses", JSON.stringify(expenses));

updateScreen();
}

function updateScreen(){

let list = document.getElementById("expenseList");
list.innerHTML="";

let total = 0;
let summary = {};

expenses.forEach((e,i)=>{

let li = document.createElement("li");

li.innerHTML =
e.category + " ₹" + e.amount +
` 
<div>
<button onclick="editExpense(${i})">Edit</button>
<button onclick="deleteExpense(${i})">X</button>
</div>
`;

list.appendChild(li);

total += e.amount;

if(summary[e.category]){
summary[e.category]+=e.amount;
}else{
summary[e.category]=e.amount;
}

});

document.getElementById("total").innerText = total;

let remaining = budget - total;

document.getElementById("remaining").innerText = remaining;

let text="";

for(let c in summary){
text += c + ": ₹" + summary[c] + " | ";
}

document.getElementById("summary").innerText = text;
}

updateScreen();