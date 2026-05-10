// Function to handle confession post
async function handleConfession(event) {
    event.preventDefault();

    const message = document.getElementById('confessMessage').value;
    const userString = localStorage.getItem('user');
    
    if (!userString) {
        alert("You must be logged in to post a confession.");
        window.location.href = 'sweetheart-login.html';
        return;
    }

    const user = JSON.parse(userString);
    const userId = user.userId;

    try {
        const response = await fetch('/confessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, userId })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Confession Posted!");
            document.getElementById('confessMessage').value = '';
            // Refresh the list of confessions
            loadConfessions(); 
        } else {
            alert(data.error || "Failed to post confession");
        }
    } catch (err) {
        console.error("Error during confession post:", err);
        alert("An error occurred. Please try again.");
    }
}

// Function to load and display confessions
async function loadConfessions() {
    try {
        const response = await fetch('/confessions');
        const confessions = await response.json();
        
        const recentConfessionsDiv = document.querySelector('.content h2').parentNode;
        
        // Find and remove existing p tags (old confessions)
        const existingCards = recentConfessionsDiv.querySelectorAll('.confession-card');
        existingCards.forEach(card => card.remove());

        if (confessions.length === 0) {
            const p = document.createElement('p');
            p.textContent = "No heart-to-hearts yet. Be the first! ❤️";
            p.style.textAlign = "center";
            p.style.color = "#888";
            recentConfessionsDiv.appendChild(p);
            return;
        }

        confessions.forEach(c => {
            const card = document.createElement('div');
            card.className = 'confession-card';
            
            const isOwn = userString && JSON.parse(userString).userId === c.userId;
            
            card.innerHTML = `
                <strong>${isOwn ? 'You said...' : 'Someone said...'}</strong>
                <p id="msg-${c.confessionId}">${c.message}</p>
                ${isOwn ? `
                    <div class="actions">
                        <button class="action-btn edit-btn" onclick="editConfession(${c.confessionId})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteConfession(${c.confessionId})">Delete</button>
                    </div>
                ` : ''}
            `;
            recentConfessionsDiv.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading confessions:", err);
    }
}

async function editConfession(id) {
    const p = document.getElementById(`msg-${id}`);
    const newMessage = prompt("Edit your confession:", p.textContent);
    
    if (newMessage && newMessage !== p.textContent) {
        try {
            const response = await fetch(`/confessions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage })
            });
            if (response.ok) {
                p.textContent = newMessage;
                alert("Confession updated! ❤️");
            }
        } catch (err) {
            console.error("Error editing confession:", err);
        }
    }
}

async function deleteConfession(id) {
    if (confirm("Are you sure you want to delete this confession?")) {
        try {
            const response = await fetch(`/confessions/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Confession deleted.");
                loadConfessions();
            }
        } catch (err) {
            console.error("Error deleting confession:", err);
        }
    }
}

// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const userString = localStorage.getItem('user');
    const isConfessPage = window.location.pathname.includes('sweetheart-confess.html');

    // Simple Auth Guard
    if (isConfessPage && !userString) {
        window.location.href = 'sweetheart-login.html';
        return;
    }

    const confessForm = document.getElementById('confessForm');
    if (confessForm) {
        confessForm.addEventListener('submit', handleConfession);
    }
    
    if (isConfessPage) {
        loadConfessions();
    }
});



