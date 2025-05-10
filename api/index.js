// pages/api/index.js - Main Entry Point (Vercel-Compatible)

import twilio from 'twilio';

export default async function handler(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_NUMBER;

  const client = twilio(accountSid, authToken);

  const salesRep = '+12627770909';
  const leadNumber = req.query.lead || '';

  if (!leadNumber) {
    return res.status(400).send('Missing lead phone number');
  }

  try {
    // Step 1: Call the Sales Rep
    await client.calls.create({
      to: salesRep,
      from: twilioNumber,
      url: `https://twilio-agent-inboundcalls.vercel.app/api/whisper-rep?lead=${encodeURIComponent(leadNumber)}`,
    });

    // Step 2: Prepare TwiML for lead connection (this is for Twilio to use, not sent directly to user)
    const twiml = new twilio.twiml.VoiceResponse();
    const dial = twiml.dial({
      callerId: twilioNumber,
      action: `/api/connect-lead?lead=${encodeURIComponent(leadNumber)}`,
      timeout: 10,
    });

    dial.number({
      url: `/api/rep-whisper?lead=${encodeURIComponent(leadNumber)}`,
    }, salesRep);

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(twiml.toString());

  } catch (err) {
    return res.status(500).send(err.message);
  }
}

// For rep whisper (equivalent to repWhisperHandler)
export async function repWhisperHandler(req, res) {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('New lead from Facebook Ads. Connecting now.');
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}

// For connect lead handler
export async function connectLeadHandler(req, res) {
  const lead = req.query.lead;
  const twilioNumber = process.env.TWILIO_NUMBER;

  const twiml = new twilio.twiml.VoiceResponse();
  const dial = twiml.dial({
    callerId: twilioNumber,
    action: `/api/lead-whisper?lead=${encodeURIComponent(lead)}`,
  });
  dial.number(lead);

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}

// For lead whisper handler
export async function leadWhisperHandler(req, res) {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('You are being connected to a sales representative.');
  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
}
