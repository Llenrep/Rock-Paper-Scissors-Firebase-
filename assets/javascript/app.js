var currentTime = moment().format("MMMM Do YYYY, h:mm:ss a")

var config = {
    apiKey: "AIzaSyAlFxT_aEDX98WEBOuEgBNQgYJaSCrMF3E",
    authDomain: "rpschat-51f26.firebaseapp.com",
    databaseURL: "https://rpschat-51f26.firebaseio.com",
    projectId: "rpschat-51f26",
    storageBucket: "rpschat-51f26.appspot.com",
    messagingSenderId: "1054655142520"
};

firebase.initializeApp(config);

var database = firebase.database();

var user = "";
var message = "";

function writeUserData(username, message) {
    database.ref('users/' + username).push().set({
        // username: name,
        message: message,
        time: currentTime
    });
};


var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function (snapshot) {
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#people-connected").html("<font color='white' size='2'><h6> Connected Users: " + snapshot.numChildren() + "</h6></font>");
});

function updateTime(){
    $("#currentTime").html(moment().format('MMMM Do YYYY, h:mm:ss a')); 
}


var player1Choice;
var player2Choice;



$(document).ready(function () {
    setInterval(updateTime, 1000);
    //section for the group chat, I only want to A. have a server store those messages, nothing more and B. Display the message sent on the actual site for everyone
    $("#textsubmit").on("click", function () {
        event.preventDefault();

        user = $("#textusername").val().trim();
       
        message = $("#textmessage").val().trim();

        $("#body-of-text").append($("<p>").text(user + " said: " + "'" + message + "'" + " :-: Time: " + currentTime));

        writeUserData(user, message);
        
        localStorage.setItem("user", user);

        localStorage.setItem("text", message);

    })
    //
    //--------------------------------------------------------
    //Reference for different connected people

    //
    //--------------------------------------------------------
    //section for the rest of the game
    // I said the first two users to enter, start, so have the game prompt you and wait for
    // a second user anytime someone joins, as soon as two users join, 1 game starts,
    // it should be able to infinitely start different games.. DO NOT KNOW HOW THATS GONNA WORK
    $("#Rock-1").on("click", function(){
        $("#user1Choice").html("<font color='black'>Player 1 Chooses: Rock</font>");
        var player1Choice = 1;
        console.log(player1Choice)
        // $("#noChoice1").html("<img class='card-img-top' src='assets/images/Rock-Transparent.png' width='100px' height='100px'");
    })
    $("#Paper-1").on("click", function(){
        $("#user1Choice").html("<font color='black'>Player 1 Chooses: Paper</font>");
        var player1Choice = 2;
        console.log(player1Choice)
    })
    $("#Scissors-1").on("click", function(){
        $("#user1Choice").html("<font color='black'>Player 1 Chooses: Scissors</font>");
        var player1Choice = 3;
        console.log(player1Choice)
    })
    //-------------------------------------------
    $("#Rock-2").on("click", function(){
        $("#user2Choice").html("<font color='black'>Player 2 Chooses: Rock</font>");
        var player2Choice = 1;
        console.log(player2Choice)
    })
    $("#Paper-2").on("click", function(){
        $("#user2Choice").html("<font color='black'>Player 2 Chooses: Paper</font>");
        var player2Choice = 2;
        console.log(player2Choice)
    })
    $("#Scissors-2").on("click", function(){
        $("#user2Choice").html("<font color='black'>Player 2 Chooses: Scissors</font>");
        var player2Choice = 3;
        console.log(player2Choice)
    })
    //
})
