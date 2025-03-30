import React, { useState, useEffect } from 'react';

// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Data fetched from /api/message: ', data);
        setData(data.text);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <div>{data || 'loading ...'}</div>;
}

export default App;
