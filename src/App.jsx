import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Player from './Components/Player';
import { usePlayer } from './Context/PlayerContext';

const Displayalbums = lazy(() => import('./albums/Displayalbums'));

function App() {
  const { audioRef } = usePlayer();

  return (
    <div className='bg-black text-white h-full'>
      <Suspense fallback={<div>Ruko Jara Sabar Karo...</div>}>
        <Player />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album/:id' element={<Displayalbums />} />
        </Routes>
      </Suspense>
      <audio ref={audioRef} preload='auto' />
    </div>
  );
}

export default App;
