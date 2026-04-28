const db = require('./db_connect');

// Function to get all users from the database
async function getAllUsers() {
    try {
        const [rows] = await db.query('SELECT * FROM Users');
        return rows;
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
    }
}

module.exports = {
    getAllUsers
};
