const db = require('./db_connect');

async function initTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS Confessions (
            confessionId INT AUTO_INCREMENT PRIMARY KEY,
            message TEXT NOT NULL,
            userId INT,
            FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
        )
    `;
    await db.query(sql);
}

initTable();

async function createConfession(message, userId) {
    const sql = `INSERT INTO Confessions (message, userId) VALUES (?, ?)`;
    const [result] = await db.query(sql, [message, userId]);
    return { confessionId: result.insertId, message, userId };
}

async function getConfessionById(confessionId) {
    const sql = `SELECT * FROM Confessions WHERE confessionId = ?`;
    const [rows] = await db.query(sql, [confessionId]);
    return rows[0];
}

async function updateConfession(confessionId, message) {
    const sql = `UPDATE Confessions SET message = ? WHERE confessionId = ?`;
    await db.query(sql, [message, confessionId]);
    return { confessionId, message };
}

async function deleteConfession(confessionId) {
    const sql = `DELETE FROM Confessions WHERE confessionId = ?`;
    await db.query(sql, [confessionId]);
    return { message: "Confession deleted successfully" };
}

async function getAllConfessions() {
    const [rows] = await db.query('SELECT * FROM Confessions');
    return rows;
}

module.exports = {
    createConfession,
    getConfessionById,
    updateConfession,
    deleteConfession,
    getAllConfessions
};

