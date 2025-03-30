import React, { useState } from 'react';

function App() {
  const [timeRegistrations, setTimeRegistrations] = useState([]); // New state for time registrations

  const addTimeRegistration = async (registrationType) => {
    try {
      const response = await fetch('/api/addTimeRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationType }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Time registration added successfully');
    } catch (error) {
      console.error('Error adding time registration:', error);
    }
  };

  const getTimeRegistration = async () => {
    try {
      const response = await fetch('/api/getTimeRegistration',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ partitionKey: 'EmployeeName' }), // Adjust as needed
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // const result = await response.json(); // Ensure JSON parsing
      const text = await response.text(); // Get the raw response text
      const data = text ? JSON.parse(text) : {}; // If text is not empty, parse it as JSON, otherwise use an empty object
      console.log('Time registration data:', data);
      setTimeRegistrations(data || []); // Ensure state is updated with an array
    } catch (error) {
      console.error('Error fetching time registration:', error);
    }
  };

  return (
    <div>
      <button onClick={() => addTimeRegistration('DayStart')}>DayStart</button>
      <button onClick={() => addTimeRegistration('LunchStart')}>LunchStart</button>
      <button onClick={() => addTimeRegistration('LunchEnd')}>LunchEnd</button>
      <button onClick={() => addTimeRegistration('DayEnd')}>DayEnd</button>
      <button onClick={getTimeRegistration}>Get Time Registration</button>
      <div>
        <h3>Time Registrations:</h3>
        <table>
          <thead>
            <tr>
              <th>PartitionKey</th>
              <th>Date</th>
              <th>RegistrationType</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {timeRegistrations.map((registration, index) => (
              <tr key={index}>
                <td>{registration.PartitionKey}</td>
                <td>{registration.Date}</td>
                <td>{registration.RegistrationType}</td>
                <td>{registration.Time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
