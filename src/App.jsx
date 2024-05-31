import React, { Suspense, lazy, useRef, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import './App.css';
import Home from './Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Player from './Components/Player';
import { usePlayer } from './Context/PlayerContext';
import Signup from './Pages/Signup';
import Login from './Pages/Login';


// Lazy load the Displayalbums component
const Displayalbums = lazy(() => import('./albums/Displayalbums'));

function App() {
  const { audioRef, albumData } = usePlayer();
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';

  useEffect(() => {
    if (isAlbum) {
      const album = albumData.find(album => album._id === albumId);
      if (album) {
        displayRef.current.style.background = `linear-gradient(${album.bgcolor}, #121212)`;
      } else {
        displayRef.current.style.background = '#121212';
      }
    } else {
      displayRef.current.style.background = '#121212';
    }
  }, [isAlbum, albumId, albumData]);

  return (
    <div ref={displayRef} className='bg-black text-white h-full'>
      <Sidebar>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/album/:id' element={<Displayalbums />} />
          <Route path='/signUp' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          </Routes>
        </Suspense>
        <Player />
      </Sidebar>
      <audio ref={audioRef} preload='auto' />
    </div>
  );
}

export default App;
