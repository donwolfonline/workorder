// pages/api/approve-request.js

let requests = []; // This will hold all submitted requests

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { requestId } = req.body;

    const requestIndex = requests.findIndex((request) => request.id === requestId);

    if (requestIndex === -1) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    requests[requestIndex].approved = true;

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
