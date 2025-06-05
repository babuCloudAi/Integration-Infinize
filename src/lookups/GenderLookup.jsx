import React, { useEffect, useState } from 'react';

const GenderLookup = () => {
  const [genderOptions, setGenderOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/infinize/lookups/cohort`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const result = await response.json();
        setGenderOptions(result.data || []);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
      }
    };

    fetchGenderData();
  }, []);

  return (
    <div>
      <h2>Lookups Integration</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {genderOptions.map((item) => (
          <li key={item.DEPARTMENT_CODE}>
            {item.LABEL} ({item.DEPARTMENT})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenderLookup;
