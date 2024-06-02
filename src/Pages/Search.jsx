import React, { useState, useEffect } from 'react';
import Albumitem from '../albums/Albumitem';
import { usePlayer } from '../Context/PlayerContext';
import Footer from '../Components/Footer';

function Search() {
    const [inputSearch, setInputSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { playWithId } = usePlayer();
    const [firstVisit, setFirstVisit] = useState(true); 

    const handleChange = (e) => {
        setInputSearch(e.target.value);
    };

    useEffect(() => {
        console.log('Search input changed:', inputSearch);
    }, [inputSearch]);

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); 
        search();
        }
    };

    const search = async () => {
      setFirstVisit(false)
        try {
            setLoading(true);
            setError(null);
            console.log(`Fetching data for query: ${inputSearch}`);
            const response = await fetch(`https://musify-rest-api.onrender.com/api/search?q=${inputSearch}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Response data:', data);
            if (Array.isArray(data)) {
                setSearchData(data);
            } else {
                setSearchData([]);
                console.log('No albums found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
       <>
        <div className='w-full h-screen rounded '>
        

            <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                    </g>
                </svg>
                <input
                    className="input "
                    type="search"
                    placeholder="Search"
                    name='search'
                    value={inputSearch}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>


           {
            firstVisit ? (<h1>Hey there</h1> ) :(<>
            
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && searchData.length === 0 && <p>No albums or songs found.</p>}
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Albums</h1>
                <div>
                    <div className="flex overflow-auto">
                        {searchData.map((item, index) => (
                            <Albumitem
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
            <div className="mb-4 ">

                <h1 className="my-5 font-bold text-2xl">Songs</h1>
                <div className="flex overflow-auto">
                    {searchData.map((album, index) => (
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
            </>)
           }
        </div>
        <Footer/>
       
        </>
       
    );
}

export default Search;
