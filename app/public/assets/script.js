$(document).ready(function() {
  $(".submit").on("click", function() {
    console.log("clicked");
    var userInput = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      score: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };
    console.log(userInput);
    $.post("/api/survey", userInput, function(result) {
      console.log(result);
    });
  });
});
