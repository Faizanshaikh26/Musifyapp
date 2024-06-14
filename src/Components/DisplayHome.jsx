import React, { useEffect, useMemo } from "react";
import { usePlayer } from "../Context/PlayerContext";
import AlbumItem from '../albums/Albumitem';

function DisplayHome() {
  const { albumData, playWithId, isLoading } = usePlayer();

  const keywords = useMemo(() => ["Top 100 India", "Top 50 Global", "Trending","Broken Hearts","Most Romantic","Latest"], []);
  const singleKeywords = useMemo(() => ["Most Romantic"], []);
  const _2ndsingleKeywords = useMemo(() => ["Lofi (Sukkon Vibes)"], []);

  const filteredAlbums = useMemo(() => {
    return albumData.filter((album) =>
      keywords.some((keyword) => album.title.includes(keyword))
    );
  }, [albumData, keywords]);

  const filteredSingleAlbums = useMemo(() => {
    return albumData.filter((singleAlbum) =>
      singleKeywords.some((singleKeyword) =>
        singleAlbum.title.toLowerCase().includes(singleKeyword.toLowerCase())
      )
    );
  }, [albumData, singleKeywords]);

  const filtered2ndSingleAlbums = useMemo(() => {
    return albumData.filter((singleAlbum) =>
      _2ndsingleKeywords.some((singleKeyword) =>
        singleAlbum.title.toLowerCase().includes(singleKeyword.toLowerCase())
      )
    );
  }, [albumData, _2ndsingleKeywords]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div>
          <div className="flex overflow-auto">
            {filteredAlbums.map((item, index) => (
              <AlbumItem
                name={item.title}
                desc={item.description}
                image={item.albumImage}
                key={index}
                id={item._id}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Most Romantic</h1>
        <div className="flex overflow-auto">
          {filteredSingleAlbums.map((album, index) => (
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

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Lofi {'Sukoon 💜'}</h1>
        <div className="flex overflow-auto">
          {filtered2ndSingleAlbums.map((album, index) => (
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
    </div>
  );
}

export default DisplayHome;
