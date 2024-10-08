// Selectors for total expenses and assets
let totalExpenses = 0;
let totalAssets = 0;

// Dummy data for demonstration (You will replace this with actual data)
const expenseData = [150, 200, 300, 400];  // Replace with actual expenses
const assetData = [1000, 1500, 2000, 2500];  // Replace with actual assets
const labels = ["January", "February", "March", "April"];  // Labels for months or categories

// 1. Pie Chart: Expense vs. Asset Breakdown
const ctx1 = document.getElementById('expenseAssetChart').getContext('2d');
const expenseAssetChart = new Chart(ctx1, {
    type: 'pie',  // Pie chart
    data: {
        labels: ['Total Expenses', 'Total Assets'],  // Pie chart labels
        datasets: [{
            data: [totalExpenses, totalAssets],  // Data for expenses and assets
            backgroundColor: ['#FF6384', '#36A2EB'],  // Colors for the pie slices
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    }
});

// 2. Line Chart: Monthly Trend of Expenses and Assets
const ctx2 = document.getElementById('monthlyTrendChart').getContext('2d');
const monthlyTrendChart = new Chart(ctx2, {
    type: 'line',  // Line chart
    data: {
        labels: labels,  // Labels for the months/categories
        datasets: [
            {
                label: 'Expenses',
                data: expenseData,  // Data for monthly expenses
                borderColor: '#FF6384',  // Line color for expenses
                backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Background fill under the line
                fill: true,
            },
            {
                label: 'Assets',
                data: assetData,  // Data for monthly assets
                borderColor: '#36A2EB',  // Line color for assets
                backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Background fill under the line
                fill: true,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Amount in $'
                }
            }
        }
    }
});
