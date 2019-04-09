var mysql = require("mysql");

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

  app.get("/api/roommate", function(req, res) {
    return res.json(roommate);
  });

  app.post("/api/roommate", function(req, res) {
    return res.json(roommate);
  });
};
