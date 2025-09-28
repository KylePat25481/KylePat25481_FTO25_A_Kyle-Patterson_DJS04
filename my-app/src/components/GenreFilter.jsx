// src/components/GenreFilter.jsx
import React from 'react';
import { usePodcast } from '../src/context/PodcastContext';

export default function GenreFilter() {
  const { selectedGenres, toggleGenre, genres } = usePodcast(); // genres is genreList array

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Genres</label>
      <div className="max-h-44 overflow-auto rounded border p-2 bg-white">
        {genres.map((g) => (
          <label key={g.id} className="flex items-center text-sm py-1">
            <input
              type="checkbox"
              checked={selectedGenres.includes(g.id)}
              onChange={() => toggleGenre(g.id)}
              className="mr-2"
            />
            <span>{g.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
