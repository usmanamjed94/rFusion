var client = require('twilio')('AC4bda13551b8aae89cff48ef2f834b585', 'e75395927acf121b047c90ef4476709f');

exports.sendsms= function(req, res){
    console.log("in sendsms");
    console.log(req.body);
    var message=req.body;
    //Send an SMS text message
    client.sendMessage({

        to:   message.number, // Any number Twilio can deliver to
        from: '+19067234430', // A number you bought from Twilio and can use for outbound communication
        body: message.sms // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio

        if (!err) { // "err" is an error received during the request, if any

            // "responseData" is a JavaScript object containing data received from Twilio.
            // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
            // http://www.twilio.com/docs/api/rest/sending-sms#example-1

            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."

        }
        
    });
    res.send("message sent!");
    res.end();
};