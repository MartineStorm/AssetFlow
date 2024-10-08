const entryForm = document.getElementById('entry-form');
const entryType = document.getElementById('entry-type');
const entryName = document.getElementById('entry-name');
const entryAmount = document.getElementById('entry-amount');
const tableBody = document.getElementById('tbody');

let totalExpenses = 0;
let totalAssets = 0;

function updateTotals() {
    document.querySelector('.summary-box:nth-child(1) p').innerText = `$${totalExpenses.toFixed(2)}`;
    document.querySelector('.summary-box:nth-child(2) p').innerText = `$${totalAssets.toFixed(2)}`;
}

function addEntry (type, name, amount) {
    const newRow = document.createElement('tr');

    const typeCell = document.createElement('td');
    typeCell.innerText = type;

    const nameCell = document.createElement('td');
    nameCell.innerText = name;

    const amountCell = document.createElement('td');
    amountCell.innerText = `$${parseFloat(amount).toFixed(2)}`;

    const dateCell = document.createElement('td');
    const currentDate = new Data().toLocaleDateString();
    dateCell.innerText = currentDate;

    newRow.appendChild(typeCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(dateCell);

    tableBody.appendChild(newRow);

    if (type === 'expense') {
        totalExpenses += parseFloat(amount);
    } else {
        totalAssets += parseFloat(amount);
    }
    updateTotals();
}

entryForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const type = entryType.value;
    const name = entryName.value;
    const amount = entryAmount.value;

    if (name.trim() === '' || amount <= 0) {
        alert('Please enter a valid name and amount');
        return;
    }

    addEntry(type, name, amount);

    entryName.value = '';
    entryAmount.value = '';
});