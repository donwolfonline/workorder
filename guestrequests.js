// pages/api/get-requests.js

let requests = []; // This will hold all submitted requests

export default function handler(req, res) {
  res.status(200).json(requests);
}
