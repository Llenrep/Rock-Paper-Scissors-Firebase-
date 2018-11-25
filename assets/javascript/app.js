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

function writeUserData(username, message){
    database.ref('users/' + username).push().set({
        username: name,
        message: message
    });
};


var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
  
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function(snapshot) {
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#people-connected").html("<h1> Connected Users: " + snapshot.numChildren() + "</h1>");
});



$(document).ready(function(){

    console.log("ready");
    console.log(database);
    //section for the group chat, I only want to A. have a server store those messages, nothing more and B. Display the message sent on the actual site
    $("#textsubmit").on("click", function() {
        
        user = $("#textusername").val().trim();
        // Window.sessionStorage
        message = $("#textmessage").val().trim();

        $("#body-of-text").append($("<p>").text(user + " said: " + "'" + message + "'"));
              
        writeUserData(user, message);
    })
    //
    //--------------------------------------------------------
    //Reference for different connected people

    //
//--------------------------------------------------------
    //section for the rest of the game

    //
})
