// pages/api/rep-whisper.js - Message to sales rep
import { twiml as Twiml } from 'twilio';

export default function handler(req, res) {
  const response = new Twiml.VoiceResponse();
  response.say('New lead from Facebook Ads. Connecting now.');

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
