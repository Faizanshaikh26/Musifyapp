import React, { useEffect, useState } from 'react';

const Playlist = ({ playlistId }) => {
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        console.log('Fetching playlist with ID:', playlistId);

        const response = await fetch(`/api/playlists/${playlistId}`, {
          headers: {
            'Content-type': 'application/json'
          }
        });

        // Verify response status
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }

        // Parse response data
        const data = await response.json();
        console.log('Playlist data:', data);

        // Set playlist state
        setPlaylist(data);

        // Fetch details for each song
        const songDetails = await Promise.all(
          data.songs.map(async (songId) => {
            try {
              console.log('Fetching song with ID:', songId);

              const songResponse = await fetch(`/api/playlistsongs/${songId}`, {
                headers: {
                  'Content-type': 'application/json',
                  'Accept': 'application/json'
                }
              });

              // Verify song response status
              if (!songResponse.ok) {
                throw new Error('Failed to fetch song');
              }

              // Parse song response data
              return songResponse.json();
            } catch (error) {
              console.error('Error fetching song:', error);
              throw error; // Propagate error to the outer catch block
            }
          })
        );

        // Log song details
        console.log('Song details:', songDetails);

        // Set songs state
        setSongs(songDetails);
      } catch (error) {
        // Handle errors
        console.error('Error fetching playlist:', error);
        setError('Failed to fetch playlist. Please try again.');
      }
    };

    // Call fetchPlaylist function
    fetchPlaylist();
  }, [playlistId]);

  // Render based on error, loading state, and playlist data
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <ul>
        {songs.map(song => (
          <li key={song._id}>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
            <audio controls>
              <source src={song.songUrl} type="audio/mpeg" />
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
