const mysql = require("mysql");
const { password } = require("../../config.json");

const DB_NAME = "discord_user";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: DB_NAME,
});

db.getUserIdByName = (name) => {
    return db.query(
        `SELECT user_id FROM ${DB_NAME} WHERE user_name = ?`,
        [name],
        (err, result) => {
            if (err) throw err;
            return result[0];
        }
    );
};

db.setAcceptNotifyByUserId = (userId, isAccept) => {
    db.query(
        `UPDATE ${DB_NAME} SET accept_notify = ? WHERE user_id = ?`,
        [parseInt(isAccept), userId],
        (err) => {
            if (err) throw err;
        }
    );
};

db.connect();
module.exports = db;
