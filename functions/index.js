// index.js - Main Entry Point

exports.handler = async function (context, event, callback) {
    const client = context.getTwilioClient();
    
    const salesRep = '+12627770909'; // Sales Rep Number
    const leadNumber = event.lead || ''; // Lead's phone number passed through the event
  
    if (!leadNumber) {
      return callback(null, 'Missing lead phone number');
    }
  
    try {
      // Step 1: Call the Sales Rep
      const call = await client.calls.create({
        to: salesRep,
        from: context.TWILIO_NUMBER,
        url: `https://e0ff-2400-adc5-117-8d00-7cd1-344d-c9de-ab72.ngrok-free.app/whisper-rep?lead=${encodeURIComponent(leadNumber)}`,
      });
  
      // Step 2: After sales rep receives the call, connect the lead to the rep
      const twiml = new Twilio.twiml.VoiceResponse();
      const dial = twiml.dial({
        callerId: context.TWILIO_NUMBER,
        action: `/connect-lead?lead=${encodeURIComponent(leadNumber)}`,
        timeout: 10,
      });
      
      dial.number(
        {
          url: `/rep-whisper?lead=${encodeURIComponent(leadNumber)}`,
        },
        salesRep
      );
      
      // Return the result
      return callback(null, twiml);
      
    } catch (err) {
      return callback(err);
    }
  };
  
  // Rep Whisper Handler
  exports.repWhisperHandler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('New lead from Facebook Ads. Connecting now.');
    callback(null, twiml);
  };
  
  // Connect Lead Handler
  exports.connectLeadHandler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    const dial = twiml.dial({
      callerId: context.TWILIO_NUMBER,
      action: `/lead-whisper?lead=${encodeURIComponent(event.lead)}`,
    });
    dial.number(event.lead); // Connecting the lead to the sales rep
    callback(null, twiml);
  };
  
  // Lead Whisper Handler
  exports.leadWhisperHandler = function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('You are being connected to a sales representative.');
    callback(null, twiml);
  };
  