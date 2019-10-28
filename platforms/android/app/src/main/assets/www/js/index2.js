var connect = false;
/* var url = "tcp://farmer.cloudmqtt.com"
var port = xxxxx
 */
 var payload_data = 0;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
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
        //app.receivedEvent('deviceready');
    
        cordova.plugins.CordovaMqTTPlugin.connect({
          url:"tcp://farmer.cloudmqtt.com", //a public broker used for testing purposes only. Try using a self hosted broker for production.
          port:16856,
          //clientId:"YOUR_USER_ID_LESS_THAN_24_CHARS",
          connectionTimeout:3000,
         willTopicConfig:{
              qos:0, //default is 0
              retain:true, //default is true
              topic:"will",
              payload:"<will topic message>"
          },
          username:"fcvpphwi",
          password:"frKw5GCmQgjW",
          keepAlive:60,
          isBinaryPayload: false, //setting this 'true' will make plugin treat all data as binary and emit ArrayBuffer instead of string on events
          success:function(s){
              //console.log("connect success");
          connect = true;
          document.getElementById("activity").innerHTML += "> connect success";
          },
          error:function(e){
              //console.log("connect error");
          connect = false;
          document.getElementById("activity").innerHTML += "> connect error";
        },
          onConnectionLost:function (){
          connect = false;
              //console.log("disconnect");
          document.getElementById("activity").innerHTML += "> disconnect ";
        },
      });

  if (!connect) {
        alert("First establish connection then try to publish")
      } else {
      var badges = document.querySelectorAll('.badge');

      navigator.accelerometer.watchAcceleration(
      handleAcceleration,
      handleError,
      { frequency: 1000 }
      );

      function handleAcceleration(acceleration) {
      badges[0].innerHTML = acceleration.x;
      badges[1].innerHTML = acceleration.y;
      badges[2].innerHTML = acceleration.z;
      //payload_data = acceleration.x+":"+acceleration.z ;
      payload_data = acceleration.x
      alert(payload_data);
      cordova.plugins.CordovaMqTTPlugin.publish({
      topic:"sense",
      payload:payload_data,
      qos:0,
          retain:false,
          success:function(s){
            document.getElementById("activity").innerHTML += "--> Success: you have published to the topic, "+payload_data+"<br>";
          },
          error:function(e){
            document.getElementById("activity").innerHTML += "--> Error: something is wrong, "+e+"<br>";
            //alert("err!! something is wrong. check the console")
            console.log(e);
          }
        });
      }
  
        function handleError() {
        alert('Error reading acceleration');
        }
    }
      },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById("connect").addEventListener('touchend',function(ev){
          alert("connect button")
        });
        document.getElementById("publish").addEventListener('touchend',function(ev){
          alert("Publish button")
        });
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