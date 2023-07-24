import React, { useEffect, useState } from 'react';
import { fetchSomething } from '../api/backend';

interface Item {
  id: number;
  name: string;
}

const Demo: React.FC = () => {
  const [data, setData] = useState<Item[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result: Item[] = await fetchSomething();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Demo;
