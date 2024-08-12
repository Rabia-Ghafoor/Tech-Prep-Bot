// app/api/chat/chat.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle the POST request
      res.status(200).json({ message: 'Hello from the API' });
    } else {
      // Handle other HTTP methods
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  