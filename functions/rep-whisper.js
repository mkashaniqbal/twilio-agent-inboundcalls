// rep-whisper.js - Message to sales rep

exports.handler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('New lead from Facebook Ads. Connecting now.');
    callback(null, twiml);
  };
  