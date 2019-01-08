// ..because mysql2 performs better
var mysql = require("mysql2");

var connection;

// If I decide to promote to Heroku it will leverage Jaws DB

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
	host: "localhost",
	user: "root",
  password: "your_password_here",
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