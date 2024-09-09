// Define API URL based on the environment (local or production)
const API_URL = window.location.hostname === 'localhost' ? 
    'http://localhost:3000' : 'https://your-backend-url.com';

// Fetch and display users when the page loads
document.addEventListener("DOMContentLoaded", getUsers);

// Function to fetch users from the back-end API
function getUsers() {
    fetch(`${API_URL}/users`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear previous data
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user.name;
                userList.appendChild(li);
            });
        })
        .catch(err => console.error('Error fetching users:', err));
}

// Function to add a new user
document.getElementById('addUserBtn').addEventListener('click', () => {
    const userName = document.getElementById('userName').value;

    if (userName) {
        // Send POST request to add new user
        fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName })
        })
        .then(response => response.json())
        .then(data => {
            console.log('User added:', data);
            getUsers(); // Refresh the user list
            document.getElementById('userName').value = ''; // Clear the input field
        })
        .catch(err => console.error('Error adding user:', err));
    } else {
        alert('Please enter a user name');
    }
});
