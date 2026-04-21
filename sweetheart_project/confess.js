// Confession class declaration (optional but good practice)
class Confession {
    constructor(message) {
        this.message = message;
        this.timestamp = new Date().toLocaleString();
    }
}

// Function to handle confession post
function handleConfession(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const message = document.getElementById('confessMessage').value;

    const newConfession = new Confession(message);

    console.log("Confession Object Created:");
    console.log(newConfession);

    alert("Confession Posted! Check the console for the object.");
    
    // Clear the textarea
    document.getElementById('confessMessage').value = '';
}

// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const confessForm = document.getElementById('confessForm');
    if (confessForm) {
        confessForm.addEventListener('submit', handleConfession);
    }
});
