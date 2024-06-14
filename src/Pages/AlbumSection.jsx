import React from 'react';
import AlbumItem from '../albums/Albumitem';

const AlbumSection = ({ title, albums, playWithId }) => {
  return (
    <div className="mb-4">
      <h1 className="my-5 font-bold text-2xl">{title}</h1>
      <div className="flex overflow-auto">
        {albums.map((album, index) => (
          <div key={index} className="flex">
            {album.songs.map((song, songIndex) => (
              <div
                key={songIndex}
                className="min-w-[180px] p-2 px-2 rounded cursor-pointer hover:bg-[#ffffff26] flex flex-col items-center"
                onClick={() => playWithId(song._id)}
              >
                <img
                  src={song.songImage}
                  alt={song.title}
                  className="rounded w-40 h-40 object-cover"
                  loading="lazy"
                />
                <p className="font-bold mt-2 mb-1">{song.title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSection;
