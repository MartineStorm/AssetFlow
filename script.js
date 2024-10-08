// Add an event listener to handle form submission
document.getElementById('entry-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from refreshing the page

    // Get form data
    const entryType = document.getElementById('entry-type').value;
    const entryName = document.getElementById('entry-name').value;
    const entryAmount = document.getElementById('entry-amount').value;

    // Input validation
    if (entryName.trim() === '' || entryAmount <= 0) {
        alert('Please enter a valid name and amount.');
        return;
    }

    const data = {
        entry_type: entryType,
        entry_name: entryName,
        entry_amount: parseFloat(entryAmount)  // Ensure amount is a number
    };

    // Send the POST request to the Flask backend
    fetch('/add-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Convert data to JSON
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            alert(result.message);  // Success message

            // Update the table with the new entry
            updateTable(entryType, entryName, parseFloat(entryAmount).toFixed(2));  // Dynamically add the new entry to the table
        } else if (result.error) {
            alert(result.error);  // Error from the backend
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the entry.');
    });

    // Clear the form inputs after submission
    document.getElementById('entry-name').value = '';
    document.getElementById('entry-amount').value = '';
});

// Function to update the table with the new entry
function updateTable(type, name, amount) {
    const tableBody = document.querySelector('tbody');  // Select the table body
    const newRow = document.createElement('tr');  // Create a new row

    // Create table cells
    const typeCell = document.createElement('td');
    typeCell.innerText = type;

    const nameCell = document.createElement('td');
    nameCell.innerText = name;

    const amountCell = document.createElement('td');
    amountCell.innerText = `$${amount}`;

    const dateCell = document.createElement('td');
    const currentDate = new Date().toLocaleDateString();  // Get the current date
    dateCell.innerText = currentDate;

    // Append the cells to the new row
    newRow.appendChild(typeCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(dateCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
}
