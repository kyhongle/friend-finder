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
    var newRoommate = req.body;
    // console.log(JSON.stringify(newRoommate));
    connection.query(
      "INSERT INTO profiles (name, photo, scores) VALUES (?,?,?)",
      [newRoommate.name, newRoommate.photo, newRoommate.score.toString()],
      function(err, result) {
        var match = findMatch(newRoommate, res);
        //return res.json({ match: match });
      }
    );
  });

  function findMatch(newRoommate, res) {
    connection.query("SELECT * FROM profiles", function(err, result) {
      console.log(JSON.stringify(result));
      var name = newRoommate.name;
      var photo = newRoommate.photo;
      var score = newRoommate.score;
      var closestMatch = [];
      for (var i = 0; i < result.length; i++) {
        var tableScores = result[i].scores.split(",");
        if (
          name !== result[i].name &&
          photo !== result[i].photo &&
          score !== tableScores
        ) {
          var matchCount = 0;
          for (var m = 0; m < tableScores.length; m++) {
            if (score[m] == tableScores[m]) {
              matchCount++;
            }
          }
          result[i].matchScore = matchCount;
          closestMatch.push(result[i]);
          closestMatch.sort((a, b) => {
            return a.matchScore > b.matchScore;
          });
          console.log(closestMatch[0]);
        }
      }
      //res.send("match");
      res.json(closestMatch[0]);
    });
  }
};
