This is the code for the quick demo at the Tessel Hack Night in San Francisco on 09/30/2014.

It's basically a login-with-RFID demo. So the idea is to login without typing your username nor password, and just by getting a valid RFID card near the reader, you're authenticated.

The way it works is when the tessel module receives the 'read' event for the RFID card, it sends a message to the client through PubNub, which then submits the login form with the card UID. If it's valid, then it let's you in.

See the [Tessel Web Server](http://github.com/edgarjs/tessel-login-web-server) script that sends the message.

**This is by no means a production project, it's just a very quick simple demo to try the tessel API. It has no security at all.**

# Run

Run the script in your tessel **(it must be connected to the wifi before)**.

    npm install
    tessel run rfid.js

And then start the [Tessel Web server](http://github.com/edgarjs/tessel-login-web-server).
