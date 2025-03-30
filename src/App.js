import React, { useState } from 'react';

function App() {
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('/api/message');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Data fetched from /api/message: ', result);
      setData(result.text);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTimeRegistration = async () => {
    try {
      const response = await fetch('/api/addTimeRegistration', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Time registration added successfully');
    } catch (error) {
      console.error('Error adding time registration:', error);
    }
  };

  return (
    <div>
      <div>{data || 'loading ...'}</div>
      <button onClick={fetchData}>Button 1</button>
      <button onClick={addTimeRegistration}>Add Time Registration</button>
    </div>
  );
}

export default App;
