cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device-motion.Acceleration",
      "file": "plugins/cordova-plugin-device-motion/www/Acceleration.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "Acceleration"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.accelerometer",
      "file": "plugins/cordova-plugin-device-motion/www/accelerometer.js",
      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "navigator.accelerometer"
      ]
    },
    {
      "id": "cordova-plugin-mqtt.MQTTEmitter",
      "file": "plugins/cordova-plugin-mqtt/www/MQTTEmitter.js",
      "pluginId": "cordova-plugin-mqtt",
      "clobbers": [
        "ME"
      ]
    },
    {
      "id": "cordova-plugin-mqtt.CordovaMqTTPlugin",
      "file": "plugins/cordova-plugin-mqtt/www/cordova-plugin-mqtt.js",
      "pluginId": "cordova-plugin-mqtt",
      "clobbers": [
        "cordova.plugins.CordovaMqTTPlugin"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-device-motion": "2.0.1",
    "cordova-plugin-mqtt": "0.3.8"
  };
});