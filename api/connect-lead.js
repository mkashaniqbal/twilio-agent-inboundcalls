// pages/api/connect-lead.js - Connect sales rep to the lead
import { twiml as Twiml } from 'twilio';

export default function handler(req, res) {
  const lead = req.query.lead;
  const callerId = process.env.TWILIO_NUMBER;

  if (!lead) {
    return res.status(400).send('Missing lead phone number');
  }

  const response = new Twiml.VoiceResponse();
  const dial = response.dial({ callerId });

  dial.number(
    {
      url: '/api/lead-whisper', // Full URL or relative to Vercel
    },
    lead
  );

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
