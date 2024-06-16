import React, { useEffect, useState, useCallback, useMemo } from "react";
import { usePlayer } from "../Context/PlayerContext";
import AlbumSection from "../Pages/AlbumSection";

function DisplayHome() {
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playWithId } = usePlayer();

  const fetchAlbumData = useCallback(async () => {
    const startTime = performance.now();
    try {
      const response = await fetch("https://musifyrestapi-vsb4.onrender.com", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setAlbumData(data.albums);
    } catch (error) {
      console.error("Error fetching album data:", error);
    } finally {
      setLoading(false);
      const endTime = performance.now();
      console.log(`Fetch and render time: ${endTime - startTime} ms`);
    }
  }, []);

  useEffect(() => {
    fetchAlbumData();
  }, [fetchAlbumData]);

  const singleKeywords = useMemo(() => ["Top 100 India"], []);
  const _2ndsingleKeywords = useMemo(() => ["Lofi (Sukkon Vibes)"], []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AlbumSection title="Top 100 India" albums={filteredSingleAlbums} playWithId={playWithId} />
      <AlbumSection title="Lofi Sukoon 💜" albums={filtered2ndSingleAlbums} playWithId={playWithId} />
    </div>
  );
}

export default DisplayHome;
