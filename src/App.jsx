import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import './App.css'
import Displayalbums from './albums/Displayalbums'
import Player from './Components/Player'
function App() {
  return (
    <div className='bg-black text-white h-full'>

<Player/>
<Routes>
  <Route path='/'element={<Home/>}/>
  <Route path='/album/:id' element={<Displayalbums/>}/>
</Routes>


    </div>
  )
}

export default App