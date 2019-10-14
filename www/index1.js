var connect = false;
var usrUrl = "tcp://farmer.cloudmqtt.com"
var usrPort = xxxxx
var topicWill = "will"
var payloadWill = "Will Message"
var usrUsername = "fcvxxxxx"
var usrPassword = "frKwxxxxxxxx"
var payloadData = "On";
var topicData = "sense"

var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
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
          connect = true;
          document.getElementById("activity").innerHTML += ">connect success";
        },
        error:function(e){
          connect = false;
          document.getElementById("activity").innerHTML += ">connect error";
        },
        onConnectionLost:function (){
          connect = false;
          document.getElementById("activity").innerHTML += ">disconnected ";
        },
      });

    if (!connect) {
    alert("First establish connection then try to publish")
    } else {
      alert(payload_data);
      cordova.plugins.CordovaMqTTPlugin.publish({
        topic:topicData,
        payload:payloadData,
        qos:0,
        retain:false,
        success:function(s){
           document.getElementById("activity").innerHTML += ">[Success]"+topicData+":" +payloadData+"<br>";
        },
        error:function(e){
           document.getElementById("activity").innerHTML += ">[Error]"+e+"<br>";
        }
      });
    }
    function handleError() {
    alert('Error reading acceleration');
  }
},
    receivedEvent: function(id) {
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
