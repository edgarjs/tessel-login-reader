var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']);

var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(0);
var led3 = tessel.led[2].output(0);
var led4 = tessel.led[3].output(0);

var ledFeedback = function (led) {
    setTimeout(function () {
        led2.toggle();
    }, 300);
};

var pubnub = require("pubnub").init({
  publish_key: "demo",
  subscribe_key: "demo",
  uuid: "your_name_here" + Math.floor(Math.random()*1000)
});

// var channel = "login-rfid";
var channel = 'rfid:login:try';

rfid.on('ready', function (version) {
    console.log("Ready to read RFID card");

    rfid.on('data', function (card) {
        var uid = card.uid.toString('hex')

        console.log("Received UID:", uid);

        ledFeedback(led2);

        pubnub.publish({
          channel: channel,
          message: uid
        });
    });

    rfid.setPollPeriod(1000);
});

rfid.on('error', function (err) {
    ledFeedback(led3);
    console.log(err);
});
