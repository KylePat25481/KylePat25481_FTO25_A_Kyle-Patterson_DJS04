// src/services/api.js

/**
 * Fetch podcast previews from the public endpoint.
 * @returns {Promise<Array>} Array of podcast preview objects
 * @throws {Error} if network response is not ok
 */
export async function fetchPodcasts() {
  const res = await fetch('https://podcast-api.netlify.app');
  if (!res.ok) throw new Error(`Failed to fetch podcasts: ${res.status}`);
  return res.json();
}
