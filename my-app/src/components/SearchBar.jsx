// src/components/SearchBar.jsx
import React from 'react';
import { usePodcast } from '../src/context/PodcastContext';

/**
 * SearchBar - Controlled input for searching podcast titles.
 * - updates query live as user types
 */
export default function SearchBar() {
  const { query, setQuery } = usePodcast();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
      <input
        aria-label="Search podcasts"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-lg border p-2"
      />
    </div>
  );
}
