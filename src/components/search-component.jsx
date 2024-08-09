import React, { useState } from 'react';
import Fuse from 'fuse.js';


const SearchComponent = ({ data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);

  const fuse = new Fuse(data, {
    keys: ['name'],
    threshold: 0.3,
  });

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    const searchResults = fuse.search(searchQuery).map(result => result.item);
    setResults(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Qidiruv"
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
