// connect-lead.js - Connect sales rep to the lead

exports.handler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
  
    const dial = twiml.dial({
      callerId: context.TWILIO_NUMBER
    });
  
    dial.number({
      url: '/lead-whisper', // URL for whisper to the lead
    }, event.lead); // Lead's phone number
  
    callback(null, twiml);
  };
  