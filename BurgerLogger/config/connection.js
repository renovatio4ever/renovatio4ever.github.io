var mysql = require("mysql2");

var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
	host: "localhost",
	user: "root",
  password: "your_db_password",
	database: "burgers_db"
});
};

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("Connected as ID " + connection.threadId);
});


module.exports = connection;