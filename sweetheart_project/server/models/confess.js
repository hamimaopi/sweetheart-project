const db = require('./db_connect');

// Function to get all confessions from the database
async function getAllConfessions() {
    try {
        const [rows] = await db.query('SELECT * FROM Confessions');
        return rows;
    } catch (err) {
        console.error("Error fetching confessions:", err);
        throw err;
    }
}

module.exports = {
    getAllConfessions
};
