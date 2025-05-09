// whisper-rep.js - Whisper message to the Sales Rep

exports.handler = function (context, event, callback) {
    const lead = event.lead;
    const twiml = new Twilio.twiml.VoiceResponse();
  
    const dial = twiml.dial({
      callerId: context.TWILIO_NUMBER,
      action: `/connect-lead?lead=${encodeURIComponent(lead)}`,
      timeout: 10
    });
  
    dial.number({
      url: '/rep-whisper', // URL for whisper message to the sales rep
    }, '+12627770909'); // Sales Rep's number
  
    callback(null, twiml);
  };
  