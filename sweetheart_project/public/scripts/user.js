// User class declaration
class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}

// Function to handle registration
function register(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const newUser = new User(firstName, lastName, username, password);
    
    console.log("Registration Object Created:");
    console.log(newUser);
    
    alert("User Registered! Check the console for the object.");
}

// Function to handle login
function login(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // For login, we can use a simpler object or the same User class with some fields null
    const loginAttempt = {
        username: username,
        password: password
    };

    console.log("Login Object Created:");
    console.log(loginAttempt);

    alert("Login Submitted! Check the console for the object.");
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', register);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});
