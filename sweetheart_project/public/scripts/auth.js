document.addEventListener('DOMContentLoaded', () => {
    const userString = localStorage.getItem('user');
    const welcomeSpan = document.getElementById('userWelcome');
    const nameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');

    if (userString) {
        const user = JSON.parse(userString);
        if (welcomeSpan && nameDisplay) {
            welcomeSpan.style.display = 'inline';
            nameDisplay.textContent = user.firstName || user.username;
        }
        if (profileLink) {
            profileLink.style.display = 'inline';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'inline';
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'sweetheart-login.html';
            });
        }
    }

});
