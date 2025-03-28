import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      try {
        const { text } = await( await fetch('/api/message')).json();
        setData(text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  });

  return <div>{data || 'loading ...'}</div>;
}

export default App;
