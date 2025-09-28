// src/components/PodcastList.jsx
import React from 'react';
import { usePodcast } from '../src/context/PodcastContext';

function PodcastCard({ p }) {
  return (
    <article className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold">{p.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{p.description ? p.description.slice(0, 140) : 'No description'}</p>
      <div className="mt-3 text-xs text-gray-500">Genres: {p.genreTitles?.join(', ') || '—'}</div>
    </article>
  );
}

export default function PodcastList() {
  const { paged, loading, error, total } = usePodcast();

  if (loading) return <div className="text-center p-8">Loading…</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error loading podcasts.</div>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {paged.map((p) => (
        <PodcastCard key={p.id} p={p} />
      ))}

      {paged.length === 0 && <div className="col-span-full text-center py-8">No results. ({total} total)</div>}
    </section>
  );
}
