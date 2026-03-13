let selectedRow = null;

function addExpense() {
    let name = document.getElementById("name").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let category = document.getElementById("category").value;

    if (name === "" || amount === "" || category === "") {
        alert("Please fill all fields!");
        return;
    }
    
    if (amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    let table = document.getElementById("expenseList");
    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = "₹" + Number(amount).toFixed(2);
    row.insertCell(2).innerHTML = category;
    row.insertCell(3).innerHTML = `
        <button class="action-btn edit-btn" onclick="editExpense(this)">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteExpense(this)">Delete</button>
    `;

    row.cells[2].className = "category-" + category.toLowerCase();

    clearInputs();
    calculateTotal();
    showMessage("Expense added successfully!", "success");
}

function editExpense(btn) {
    selectedRow = btn.parentElement.parentElement;
    
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[1].innerHTML.replace("₹", "");
    document.getElementById("category").value = selectedRow.cells[2].innerHTML;
    
    selectedRow.style.backgroundColor = "#fef9c3";
}

function updateExpense() {
    if (selectedRow == null) {
        alert("Please select an expense to update!");
        return;
    }
    
    let name = document.getElementById("name").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let category = document.getElementById("category").value;

    if (name === "" || amount === "" || category === "") {
        alert("Please fill all fields!");
        return;
    }
    
    if (amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    selectedRow.cells[0].innerHTML = name;
    selectedRow.cells[1].innerHTML = "₹" + Number(amount).toFixed(2);
    selectedRow.cells[2].innerHTML = category;
    selectedRow.cells[2].className = "category-" + category.toLowerCase();
    
    selectedRow.style.backgroundColor = "";
    selectedRow = null;
    
    clearInputs();
    calculateTotal();
    showMessage("Expense updated successfully!", "success");
}

function deleteExpense(btn) {
    if (confirm("Are you sure you want to delete this expense?")) {
        let row = btn.parentElement.parentElement;
        row.remove();
        calculateTotal();
        showMessage("Expense deleted!", "success");
        
        if (selectedRow === row) {
            selectedRow = null;
            clearInputs();
        }
    }
}

function calculateTotal() {
    let table = document.getElementById("expenseList");
    let total = 0;

    for (let i = 0; i < table.rows.length; i++) {
        let amountText = table.rows[i].cells[1].innerHTML;
        let amount = parseFloat(amountText.replace("₹", ""));
        total += amount;
    }

    document.getElementById("total").innerHTML = total.toFixed(2);
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "Food";
    
    if (selectedRow) {
        selectedRow.style.backgroundColor = "";
        selectedRow = null;
    }
}

function showMessage(msg, type) {
    console.log(msg);
}

document.addEventListener("DOMContentLoaded", function() {
});