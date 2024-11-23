// pages/api/submit-request.js

let requests = []; // Use a mock in-memory store for simplicity

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { guestName, guestNationality, guestId, destinationFrom, destinationTo } = req.body;

    const newRequest = {
      id: Date.now(),
      guestName,
      guestNationality,
      guestId,
      destinationFrom,
      destinationTo,
      approved: false,
    };

    requests.push(newRequest);

    return res.status(200).json({ success: true, requestId: newRequest.id });
  }

  res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
