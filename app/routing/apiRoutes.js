var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "roommate_db"
  });
}
connection.connect();
module.exports = connection;

module.exports = function(app) {
  var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "roommate_db"
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  app.get("/api/survey", function(req, res) {
    return res.json(roommate);
  });

  app.post("/api/survey", function(req, res) {
    return res.json(roommate);
    var newRoommate = req.body;
  });
};
