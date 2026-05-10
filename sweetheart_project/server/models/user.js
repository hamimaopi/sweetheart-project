const db = require('./db_connect');
const bcrypt = require('bcrypt');

async function initTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS Users (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `;
    await db.query(sql);
}

initTable();

async function register(user) {
    const { firstName, lastName, username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO Users (firstName, lastName, username, password) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [firstName, lastName, username, hashedPassword]);
    return { userId: result.insertId, firstName, lastName, username };
}

async function login(username, password) {
    const sql = `SELECT * FROM Users WHERE username = ?`;
    const [rows] = await db.query(sql, [username]);
    if (rows.length === 0) throw new Error("User not found");
    
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

async function updateUser(userId, data) {
    const { firstName, lastName, username } = data;
    const sql = `UPDATE Users SET firstName = ?, lastName = ?, username = ? WHERE userId = ?`;
    await db.query(sql, [firstName, lastName, username, userId]);
    return { userId, firstName, lastName, username };
}

async function deleteUser(userId) {
    const sql = `DELETE FROM Users WHERE userId = ?`;
    await db.query(sql, [userId]);
    return { message: "User deleted successfully" };
}

async function getAllUsers() {
    const [rows] = await db.query('SELECT userId, firstName, lastName, username FROM Users');
    return rows;
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    getAllUsers
};

