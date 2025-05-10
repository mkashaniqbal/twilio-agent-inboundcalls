// pages/api/lead-whisper.js - Message to the lead
import { twiml as Twiml } from 'twilio';

export default function handler(req, res) {
  const response = new Twiml.VoiceResponse();
  response.say('You are being connected to a sales representative.');

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
