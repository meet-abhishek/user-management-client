// Define API URL based on the environment (local or production)
const API_URL = window.location.hostname === 'localhost' ? 
    'http://localhost:3000' : 'https://user-management-server-atxq.onrender.com';

// Function to fetch and display users from the back-end API
function getUsers() {
    fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched users:', data);
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous data
            
            if (data.length === 0) {
                userList.innerHTML = '<li>No users found</li>';
                return;
            }

            data.forEach(user => {
                const li = document.createElement('li');
                // Handle cases where email might be null or undefined
                const emailText = user.email ? `Your Email is ${user.email}` : 'No email provided';
                li.textContent = `Hello ${user.name}. ${emailText}`;
                userList.appendChild(li);
            });
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            const userList = document.getElementById('userList');
            userList.innerHTML = '<li>Error fetching users. Please try again later.</li>';
        });
}

// Function to handle adding a new user
function handleAddUser() {
    const userName = document.getElementById('userName').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();

    // Validate input
    if (!userName) {
        alert('Please enter a user name');
        return;
    }

    if (!userEmail) {
        alert('Please enter a user email');
        return;
    }

    // Optional: Basic email format validation
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(userEmail)) {
        alert('Please enter a valid email address');
        return;
    }

    console.log('Adding user:', userName, userEmail);

    // Send POST request to add new user
    fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: userName, email: userEmail })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User added:', data);
        getUsers(); // Refresh the user list
        document.getElementById('userName').value = ''; 
        document.getElementById('userEmail').value = '';
    })
    .catch(err => {
        console.error('Error adding user:', err);
        alert('Error adding user. Please try again later.');
    });
}

// Function to clear all users
function clearUsers() {
    fetch(`${API_URL}/users`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        getUsers(); // Refresh the user list
    })
    .catch(err => {
        console.error('Error clearing users:', err);
        alert('Error clearing users. Please try again later.');
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('addUserBtn').addEventListener('click', handleAddUser);
    document.getElementById('clearUsersBtn').addEventListener('click', clearUsers);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    getUsers(); // Fetch and display users on page load
});
