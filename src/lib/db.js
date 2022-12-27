const mysql = require("mysql");
const { password } = require("../../config.json");

const DB = {
    DB_NAME: "discord_user",
    USER_ID: "user_id",
    USER_NAME: "user_name",
    ALLOW_NOTIFY: "accept_notify",
};

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: DB.DB_NAME,
});

db.getUserIdByName = (name, callback) => {
    db.query(
        `SELECT ${DB.USER_ID} FROM ${DB.DB_NAME} WHERE ${DB.USER_NAME} = ?`,
        [name],
        (err, result) => {
            if (err) throw err;
            callback(result[0]);
        }
    );
};

db.getAllowNotifyByUserId = (userId, callback) => {
    db.query(
        `SELECT ${DB.ALLOW_NOTIFY} FROM ${DB.DB_NAME} WHERE ${DB.USER_ID} = ?`,
        [userId],
        (err, result) => {
            if (err) throw err;
            callback(result[0]);
        }
    );
};

db.setAllowNotifyByUserId = (userId, isAccept) => {
    db.query(
        `UPDATE ${DB.DB_NAME} SET ${DB.ALLOW_NOTIFY} = ? WHERE ${DB.USER_ID} = ?`,
        [isAccept, userId],
        (err) => {
            if (err) throw err;
        }
    );
};

db.insertUser = (userId, userName) => {
    db.query(
        `INSERT INTO ${DB.DB_NAME}(${DB.USER_ID}, ${DB.USER_NAME}) VALUES (?,?)`,
        [userId, userName],
        (err) => {
            if (err) throw err;
        }
    );
};

db.deleteUser = (userId) => {
    db.query(`DELETE FROM ${DB.DB_NAME} WHERE ${DB.USER_ID} = ?`, [userId], (err) => {
        if (err) throw err;
    });
};

db.connect();
module.exports = db;
