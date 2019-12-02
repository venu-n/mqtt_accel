
var connect = false;
var usrUrl = "tcp://farxxx.xxxmqtt.com";
var usrPort = 141xxx;
var topicWill = "will";
var payloadWill = "Will Message";
var usrUsername = "asdf";
var usrPassword = "as";
var payloadData = "0:0:0";
var topicData = "sense";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    document.getElementById("connect").addEventListener('touchend',function(ev){
    // var usrUrl = document.getElementById("eusrUrl").value;
    // var usrPort = document.getElementById("eusrPort").value;
    // var usrUsername = document.getElementById("eusrUsername").value;
    // var usrPassword = document.getElementById("eusrPassword").value;
    // var topicData = document.getElementById("etopicData").value;
    //alert(usrUrl+":"+usrPort+":"+usrUsername+":"+usrPassword+":"+topicData;
    cordova.plugins.CordovaMqTTPlugin.connect({
    url:usrUrl, //a public broker used for testing purposes only. Try using a self hosted broker for production.
    port:usrPort,
    //clientId:"YOUR_USER_ID_LESS_THAN_24_CHARS",
    connectionTimeout:3000,
    willTopicConfig:{
        qos:0, //default is 0
        retain:true, //default is true
        topic:topicWill,
        payload:payloadWill 
    },
    username:usrUsername,
    password:usrPassword,
    keepAlive:60,
    isBinaryPayload: false, //setting this 'true' will make plugin treat all data as binary and emit ArrayBuffer instead of string on events
    success:function(s){
        //console.log("connect success");
    connect = true;
    badges[0].innerHTML = "Connected";
    //document.getElementById("activity").innerHTML += " > connect success"+"<br>";
    },
    error:function(e){
        //console.log("connect error");
    connect = false;
    badges[0].innerHTML = "Error";
    //document.getElementById("activity").innerHTML += " > connect error"+"<br>";
  },
    onConnectionLost:function (){
    connect = false;
        //console.log("disconnect");
      badges[0].innerHTML = "No Internet";
    //document.getElementById("activity").innerHTML += " > disconnect "+"<br>";
    },
    });
  });


    var badges = document.querySelectorAll('.notification');
    var payloadData;
    navigator.accelerometer.watchAcceleration(handleAcceleration,handleError,
    { frequency: 100 });

    function handleAcceleration(acceleration) {
    var acc_x = Math.round(acceleration.x * 10)/10;
    var acc_y = Math.round(acceleration.y * 10)/10;
    var acc_z = Math.round(acceleration.z * 10)/10;
    badges[1].innerHTML = " | " + acc_x + " | " + acc_y + " | " + acc_z + " | ";
    payloadData = " | " + acc_x + " | " + acc_y + " | ";
    // if (acc_x > 7.5){
    //   badges[4].innerHTML = "Reverse";
    // }else if (acc_x < 6.5){
    //   badges[4].innerHTML = "Forward";
    // }else 
    lvl_fwd = 8;
    lvl_rvs = 8.5;
    lvl_left = -1.5;
    lvl_right = 1.5;

    if (acc_x > lvl_rvs && acc_y < lvl_left){
      badges[4].innerHTML = "Reverse-Left";
    }else if ((acc_x > lvl_rvs && acc_y > lvl_right)){
      badges[4].innerHTML = "Reverse-Right";
    }else if ((acc_x < lvl_fwd && acc_y < lvl_left)){
      badges[4].innerHTML = "Forward-left";
    }else if ((acc_x < lvl_fwd && acc_y > lvl_right)){
      badges[4].innerHTML = "Forward-Right";
    }else if ((acc_x < lvl_fwd && (acc_y < lvl_right && acc_y > lvl_left))){
      badges[4].innerHTML = "Forward";
    }else if ((acc_x > lvl_rvs && (acc_y < lvl_right && acc_y > lvl_left))){
      badges[4].innerHTML = "Reverse";
    }



  if (connect) {
    //alert(payloadData);
    cordova.plugins.CordovaMqTTPlugin.publish({
      topic:topicData,
      payload:payloadData,
      qos:0,
      retain:false,
      success:function(s){
         //document.getElementById("activity").innerHTML = ">[Success]"+topicData+":" +payload+"<br>";
      badges[2].innerHTML = topicData;
      badges[3].innerHTML = payloadData;
      badges[5].innerHTML = ">Published:"+ topicData + " > " + payloadData;
      },
      error:function(e){
       badges[5].innerHTML = ">[Error]"+e+"<br>";
       //  document.getElementById("activity").innerHTML += ">[Error]"+e+"<br>";
      }
    });
    } else {
       badges[5].innerHTML = "Not Connected";
    }
    }
      function handleError(err){
        //alert("Error: " + err);
        badges[5].innerHTML = "Error: " + err;
      }
        console.log('Received Event: ' + id);
    },

    append:function (id,s) {
      // it is just a string append function. Nothing to do with the MQTT functions
      var node = document.createElement("p");                 // Create a <li> node
      var textnode = document.createTextNode(s);         // Create a text node
      node.appendChild(textnode);                              // Append the text to <li>
      document.getElementById(id).appendChild(node);     // Append <li> to <ul> with id="myList"
    }
};

app.initialize();
