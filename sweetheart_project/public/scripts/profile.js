document.addEventListener('DOMContentLoaded', () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        window.location.href = 'sweetheart-login.html';
        return;
    }

    const user = JSON.parse(userString);
    const form = document.getElementById('profileForm');
    const deleteBtn = document.getElementById('deleteAccountBtn');

    // Fill form with current data
    document.getElementById('firstName').value = user.firstName || '';
    document.getElementById('lastName').value = user.lastName || '';
    document.getElementById('username').value = user.username || '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value
        };

        try {
            const response = await fetch(`/users/${user.userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // Update local storage
                localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUser }));
                alert("Profile updated successfully! ❤️");
                location.reload();
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    });

    deleteBtn.addEventListener('click', async () => {
        if (confirm("WARNING: Are you sure you want to delete your account? This cannot be undone.")) {
            try {
                const response = await fetch(`/users/${user.userId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert("Account deleted. We're sad to see you go! ❤️");
                    localStorage.removeItem('user');
                    window.location.href = 'sweetheart-register.html';
                }
            } catch (err) {
                console.error("Error deleting account:", err);
            }
        }
    });
});
