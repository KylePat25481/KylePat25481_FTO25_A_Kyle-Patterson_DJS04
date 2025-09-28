// src/components/SortSelect.jsx
import React from 'react';
import { usePodcast } from '../src/context/PodcastContext';

export default function SortSelect() {
  const { sortKey, setSortKey } = usePodcast();
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="w-full rounded-lg border p-2"
      >
        <option value="newest">Newest first</option>
        <option value="title_asc">Title A–Z</option>
        <option value="title_desc">Title Z–A</option>
      </select>
    </div>
  );
}
