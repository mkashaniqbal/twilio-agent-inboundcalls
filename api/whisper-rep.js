// pages/api/whisper-rep.js - Whisper message to the Sales Rep
import { twiml as Twiml } from 'twilio';

export default function handler(req, res) {
  const lead = req.query.lead || '';
  const response = new Twiml.VoiceResponse();

  const dial = response.dial({
    callerId: process.env.TWILIO_NUMBER,
    action: `/api/connect-lead?lead=${encodeURIComponent(lead)}`,
    timeout: 10,
  });

  dial.number(
    {
      url: '/api/rep-whisper',
    },
    '+12627770909'
  );

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
