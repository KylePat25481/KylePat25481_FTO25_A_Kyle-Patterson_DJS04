## 🎧 DSJ04 React Podcast App – Kyle Patterson

Welcome to my React Podcast App project!
This app lets users search, sort, filter, and paginate through a large list of podcasts in real time.
It’s built with React and showcases my ability to manage complex UI state while keeping everything smooth and responsive.

## 🌟 Project Overview

The goal of this project was to create an advanced podcast browsing experience that feels fast, intuitive, and organized.
Users can:

# 🔎 Search podcast titles dynamically as they type.

# ↕️ Sort shows by newest first or alphabetically (A–Z / Z–A).

# 🎯 Filter podcasts by genre using data from the data.js mapping file.

# 📄 Paginate results so the list remains readable and lightweight.

All of these features stay in sync so that changing one control (like a search or filter) won’t reset the others.

## 🧩 Project Structure
src/
│
├── api/
|   ├── fetchPodcast.js         # Asynchronously fetches podcast data from the remote API.
├── components/
│   ├── PodcastCard.jsx         # Displays individual podcast cards
|   ├── PodcastCard.modular.css # Scoped modular CSS for consistent design
│   ├── PodcastGrid.jsx         # Renders all podcast cards with pagination
|   ├── PodcastGrid.modular.css # Scoped modular CSS for consistent design
│   ├── SearchBar.jsx           # Handles dynamic searching
|   ├── SearchBar.modular.css   # Scoped modular CSS for consistent design
│   ├── SortSelect.jsx          # Dropdown for sorting logic
|   ├── SortSelect.modular.css  # Scoped modular CSS for consistent design
│   ├── GenreFilter.jsx         # Filters podcasts by genre
|   ├──GenreFilter.modular.css  # Scoped modular CSS for consistent design
│   ├── Pagination.jsx          # Controls for page navigation
|   ├──Pagination.modular.css   # Scoped modular CSS for consistent design
│
├── context/
│   └── PodcastContext.jsx      # Centralized state management using Context API
│
├── utils/
│   ├── formatDate.js           # Formats podcast release dates
│
├── data.js                     # Contains podcast objects
├── App.jsx                     # Root component that composes the layout
├── main.jsx                    # Entry point (ReactDOM rendering)
└── styles/
    └── App.module.css          # Scoped modular CSS for consistent design

## 🛠️ Tech Stack

React (Vite) – for a fast development experience.

Context API – to manage global state across search, filter, sort, and pagination.

JavaScript (ES6+) – modular, clean code with JSDoc comments.

CSS – responsive design and polished UI.

## 🚀 Features

✅ Live Search – Find podcasts instantly without needing the full title.
✅ Smart Sorting – Sort by newest updates or alphabetically (A–Z or Z–A).
✅ Genre Filtering – Narrow results to categories using the provided genre ID → title mapping.
✅ Pagination – Browse podcasts in manageable chunks without losing state.
✅ State Synchronization – Search, sort, filter, and pagination all work together seamlessly.

## 🧠 Design Decisions
* State Centralization:
The Context API was chosen instead of Redux for simplicity, performance, and ease of integration within a mid-sized React app.

* Derived State:
Search, sort, and filters compute results on-the-fly without mutating the source dataset.

* Separation of Concerns:
Logic (filtering, sorting) lives in utility functions, keeping components lean and reusable.

* Performance Optimization:
Only the currently visible page of podcasts is rendered at once, improving load time.

## 🧰 Installation & Setup
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/react-podcast-app.git

# 2️⃣ Navigate into the project
cd react-podcast-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run the development server
npm run dev

Then open http://localhost:5173 to view it in your browser.

## 🧪 Testing & Development Notes
* Tested on Chrome, Edge, and Firefox for compatibility.

* Components built with modularity in mind for easy extension (e.g., adding favorites or playlists).

* The app is fully client-side and can integrate easily with an API in future versions.

## 📦 Future Improvements

## 🔄 Integrate real podcast API (e.g., ListenNotes or Spotify API).

## 💾 Add persistent favorites using LocalStorage or IndexedDB.

## 🌓 Implement dark/light mode toggling.

## 🗂️ Introduce category-based homepage sections (e.g., “Top Trending”).