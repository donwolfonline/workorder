// components/DriverForm.js

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DriverForm() {
  const [guestName, setGuestName] = useState('');
  const [guestNationality, setGuestNationality] = useState('');
  const [guestId, setGuestId] = useState('');
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      guestName,
      guestNationality,
      guestId,
      destinationFrom,
      destinationTo,
    };

    // Send data to the backend (API route)
    const response = await fetch('/api/submit-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (result.success) {
      // Generate PDF and download
      const pdfResponse = await fetch(`/api/generate-pdf?id=${result.requestId}`);
      const pdfBlob = await pdfResponse.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open PDF in a new tab for printing
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Guest Name:</label>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Guest Nationality:</label>
        <input
          type="text"
          value={guestNationality}
          onChange={(e) => setGuestNationality(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Guest ID:</label>
        <input
          type="text"
          value={guestId}
          onChange={(e) => setGuestId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destination From:</label>
        <input
          type="text"
          value={destinationFrom}
          onChange={(e) => setDestinationFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destination To:</label>
        <input
          type="text"
          value={destinationTo}
          onChange={(e) => setDestinationTo(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
}
