// components/AdminDashboard.js

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('/api/get-requests');
      const data = await response.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    const response = await fetch(`/api/approve-request`, {
      method: 'POST',
      body: JSON.stringify({ requestId }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    if (result.success) {
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, approved: true } : request
        )
      );
    }
  };

  return (
    <div>
      <h1>Requests from Drivers</h1>
      <table>
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Nationality</th>
            <th>Destination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.guestName}</td>
              <td>{request.guestNationality}</td>
              <td>{`${request.destinationFrom} → ${request.destinationTo}`}</td>
              <td>
                {request.approved ? (
                  <span>Approved</span>
                ) : (
                  <button onClick={() => handleApprove(request.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
