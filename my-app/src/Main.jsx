import React, { useEffect, useState } from "react";
import "./App.css";
import { genres } from "./data.js"; 

const PAGE_SIZE = 8;

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => setPodcasts(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const filtered = podcasts
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (genre === "all" ? true : p.genreIds.includes(Number(genre))))
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.updated) - new Date(a.updated);
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container">
      <h1>🎧 Podcast Browser</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search podcasts…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
        </select>

        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {pageData.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{new Date(p.updated).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            ◀ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
