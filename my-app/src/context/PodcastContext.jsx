// src/context/PodcastContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchPodcasts } from '../services/api';
import { genreList, genres as genresMap } from '../data/genres';

const PodcastContext = createContext(null);

// Keys to use in localStorage
const STORAGE_KEY = 'podcastAppState';

function loadStateFromStorage() {
  try {
    const str = localStorage.getItem(STORAGE_KEY);
    if (!str) return null;
    return JSON.parse(str);
  } catch (err) {
    console.warn('Failed to parse persisted podcastAppState', err);
    return null;
  }
}

function saveStateToStorage(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (err) {
    console.warn('Failed to save podcastAppState', err);
  }
}

/**
 * PodcastProvider with persistence
 */
export function PodcastProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // UI state (initialize from localStorage)
  const persisted = loadStateFromStorage();
  const [query, setQuery] = useState(persisted?.query ?? '');
  const [selectedGenres, setSelectedGenres] = useState(persisted?.selectedGenres ?? []);
  const [sortKey, setSortKey] = useState(persisted?.sortKey ?? 'newest');
  const [page, setPage] = useState(persisted?.page ?? 1);
  const [pageSize, setPageSize] = useState(persisted?.pageSize ?? 12);

  // Persist UI state when any relevant state changes
  useEffect(() => {
    const toSave = { query, selectedGenres, sortKey, page, pageSize };
    saveStateToStorage(toSave);
  }, [query, selectedGenres, sortKey, page, pageSize]);

  // fetch data
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPodcasts()
      .then((list) => {
        if (!mounted) return;
        setData(list || []);
      })
      .catch((err) => {
        console.error('fetchPodcasts error', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const enriched = useMemo(() => {
    return data.map((p) => ({
      ...p,
      genre_ids: Array.isArray(p.genre_ids) ? p.genre_ids : [],
      genreTitles: (p.genre_ids || []).map((id) => genresMap[id]).filter(Boolean),
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = enriched.filter((p) => {
      if (q) {
        const title = (p.title || '').toLowerCase();
        if (!title.includes(q)) return false;
      }
      if (selectedGenres.length > 0) {
        const has = (p.genre_ids || []).some((id) => selectedGenres.includes(id));
        if (!has) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortKey === 'newest') {
        const getDate = (item) =>
          new Date(item.last_update || item.updated_at || item.published_at || item.pubdate || 0).getTime();
        return getDate(b) - getDate(a);
      }
      if (sortKey === 'title_asc') return (a.title || '').localeCompare(b.title || '');
      if (sortKey === 'title_desc') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });

    return list;
  }, [enriched, query, selectedGenres, sortKey]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    setPage((prev) => {
      if (prev < 1) return 1;
      if (prev > totalPages) return totalPages;
      return prev;
    });
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearFilters = () => {
    setSelectedGenres([]);
  };

  const value = {
    loading,
    error,
    query,
    setQuery,
    selectedGenres,
    setSelectedGenres,
    toggleGenre,
    clearFilters,
    sortKey,
    setSortKey,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    paged,
    genres: genreList,
    genreMap: genresMap,
  };

  return <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>;
}

export const usePodcast = () => {
  const ctx = useContext(PodcastContext);
  if (!ctx) throw new Error('usePodcast must be used inside PodcastProvider');
  return ctx;
};
