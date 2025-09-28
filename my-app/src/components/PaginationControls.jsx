// src/components/PaginationControls.jsx
import React from 'react';
import { usePodcast } from '../src/context/PodcastContext';

export default function PaginationControls() {
  const { page, setPage, totalPages, total } = usePodcast();
  // only render a compact set of pages if many pages exist
  const range = [];
  const maxButtons = 7; // show up to 7 page buttons in the control
  const start = Math.max(1, Math.min(page - Math.floor(maxButtons / 2), Math.max(1, totalPages - maxButtons + 1)));
  for (let i = start; i <= Math.min(totalPages, start + maxButtons - 1); i++) range.push(i);

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-gray-600">Total results: {total}</div>

      <nav className="flex items-center space-x-2" aria-label="Pagination">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1 rounded border">
          Prev
        </button>

        {start > 1 && (
          <>
            <button onClick={() => setPage(1)} className={`px-3 py-1 rounded border ${1 === page ? 'bg-gray-200' : ''}`}>
              1
            </button>
            {start > 2 && <span className="px-2">…</span>}
          </>
        )}

        {range.map((p) => (
          <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded border ${p === page ? 'bg-gray-200' : ''}`}>
            {p}
          </button>
        ))}

        {range[range.length - 1] < totalPages && (
          <>
            {range[range.length - 1] < totalPages - 1 && <span className="px-2">…</span>}
            <button onClick={() => setPage(totalPages)} className={`px-3 py-1 rounded border ${totalPages === page ? 'bg-gray-200' : ''}`}>
              {totalPages}
            </button>
          </>
        )}

        <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border">
          Next
        </button>
      </nav>
    </div>
  );
}
