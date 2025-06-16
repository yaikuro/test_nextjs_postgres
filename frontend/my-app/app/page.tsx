'use client';

import { useEffect, useState } from 'react';

type Item = {
  id: number;
  name: string;
  description: string;
};

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Fetch existing items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/items');
      if (res.ok) {
        const data: Item[] = await res.json();
        setItems(data);
      } else {
        console.error('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  // Handle form submission to add a new item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (res.ok) {
      const newItem: Item = await res.json();
      setItems((prev) => [...prev, newItem]);
      setName('');
      setDescription('');
    } else {
      console.error('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Item Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
