// lead-whisper.js - Message to the lead

exports.handler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('You are being connected to a sales representative.');
    callback(null, twiml);
  };
  