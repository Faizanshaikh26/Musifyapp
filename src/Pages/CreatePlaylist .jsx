import React, { useState, useEffect } from 'react';

const CreatePlaylist = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [songs, setSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [error, setError] = useState(''); // State to manage errors
  const [createdPlaylist, setCreatedPlaylist] = useState(null); // State to store the created playlist

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8000/');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        const data = await response.json();
        const songsFromAlbums = data.albums.flatMap(album => album.songs);
        setAllSongs(songsFromAlbums);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('Error fetching songs'); // Set error state
      }
    };
    fetchSongs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth-token'); // Ensure correct key name
      console.log('Retrieved token:', token); // Debug log

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:8000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, songs }),
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const data = await response.json();
      console.log('Playlist created:', data);
      setCreatedPlaylist(data); // Store the created playlist
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError(error.message); // Store the error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Playlist Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songs">
            Songs
          </label>
          <select
            id="songs"
            multiple
            onChange={(e) => setSongs([...e.target.selectedOptions].map(o => o.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {allSongs.map(song => (
              <option key={song._id} value={song._id}>{song.title}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Playlist
          </button>
        </div>
      </form>

      {createdPlaylist && (
        <div className="mt-6 p-6 bg-gray-100 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Playlist Created</h2>
          <p><strong>Name:</strong> {createdPlaylist.name}</p>
          <p><strong>Description:</strong> {createdPlaylist.description}</p>
          <p><strong>Songs:</strong></p>
          <ul>
            {createdPlaylist.songs.map(song => (
              <li key={song}>{song}</li>
            ))}
          </ul>
          <p><strong>Created At:</strong> {new Date(createdPlaylist.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;
