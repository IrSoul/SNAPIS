const apiKey = 'AIzaSyC_Q_ZT1GkRnqSBrnnCUZzfg7BLvmSC_EA'; // Replace with your actual API key
const spreadsheetId = '10w7y2qV2S-GkQIDZUxZcc9b6Fgpa_JTtvIDSm-sA_FA';
let currentPage = 1;
const rowsPerPage = 50;
let totalRows = 0;
let allData = [];

function fetchData() {
    const range = `IRISHSOUL PRINTS!A:Z`;
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            allData = data.values;
            totalRows = allData.length;
            renderTable(allData.slice(0, rowsPerPage)); // Render the first page
            updatePagination();
            makeRowsClickable(); // Call to make rows clickable after table is populated
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderTable(data) {
    // Rest of the renderTable function
    // ...
}

function updateStatus(selectElement, row, columnIndex) {
    // Function to handle status updates
    // ...
}

function onRowClick(rowData, rowIndex) {
    // Function to show the modal for editing order details
    // ...
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function updatePagination() {
    // Function to update pagination
    // ...
}

function makeRowsClickable() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    rows.forEach((row, index) => {
        row.addEventListener('click', () => {
            const rowData = Array.from(row.cells).map(cell => cell.textContent);
            onRowClick(rowData, index + 1); // Adding 1 because rows are 1-indexed in Google Sheets
        });
    });
}

// Save changes button
document.getElementById('save-changes').addEventListener('click', function() {
    const form = document.getElementById('edit-order-form');
    const rowIndex = form.dataset.rowIndex;
    const inputs = form.querySelectorAll('input');
    const updatedData = Array.from(inputs).map(input => input.value);
    
    // Here you need to call your server-side code to save the updatedData for the rowIndex
    
    closeModal();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}

// When the user clicks on <span> (x), close the modal
document.querySelector('.close').addEventListener('click', closeModal);

// Fetch data initially
fetchData();
