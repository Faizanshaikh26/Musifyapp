import React, { useState, useEffect, useCallback } from 'react';
import { usePlayer } from '../Context/PlayerContext';

function Player() {
  const {
    currentTrack,
    isPlaying,
    play,
    pause,
    nextTrack,
    previousTrack,
    time,
    seekBar,
    seek,
    handleMouseDown,
    seekBg,
    seekRing,
    audioRef,
    isLoading
  } = usePlayer();

  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  const handleVolumeChange = useCallback((event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  }, []);

  const formatTime = (minute, second) => `${minute}:${second < 10 ? `0${second}` : second}`;

  if (!currentTrack) {
    return null;
  }

  return (
    <div className='w-[84.5%] h-[70px] md:h-[100px] lg:h-[100px] lg:w-[94.3%] md:w-[94%] fixed bottom-0 bg-[#252525] overflow-hidden rounded'>
      <div className="p-2 pb-0 sm:p-4 sm:pb-3 lg:p-2 lg:pb-1 xl:p-4 xl:pb-3 space-y-2 sm:space-y-4 lg:space-y-2 xl:space-y-4 items-center">
        <div className="flex items-center space-x-2">
          <img
            src={currentTrack.songImage}
            width="50"
            height="50"
            className="flex-none rounded bg-slate-100 object-cover w-[45px] h-[40px] lg:w-[50px] lg:h-[46px]"
            loading="lazy"
            alt={currentTrack.title}
          />
          <div>
            <h2 className="text-slate-200 dark:text-slate-400 leading-6 truncate text-[12px] md:text-[19px] mb-4">
              {currentTrack.title}
            </h2>
          </div>
        </div>
        <div className="space-y- md:space-y-[-30px] lg:ml-[20%]">
          <div
            className="relative w-full md:w-3/4 lg:w-2/3 mt-[-1px]"
            ref={seekBg}
            onClick={seek}
          >
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden h-2">
              <div
                ref={seekBar}
                className="bg-cyan-500 dark:bg-cyan-400 w-0 h-full transition-width duration-500"
                role="progressbar"
                aria-label="music progress"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div
              ref={seekRing}
              className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute top-1/2 transform -translate-y-1/2 w-3 h-3 flex items-center justify-center bg-white rounded-full shadow cursor-pointer"
              style={{ left: "0%" }}
              onMouseDown={handleMouseDown}
            >
              <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex relative top-[-35px] left-[18%] text-sm leading-6 font-medium tabular-nums gap-1 lg:left-[30%] md:left-[40%] md:top-[-20px]">
            <div className="text-cyan-500 dark:text-slate-100 text-[13px] md:text-[19px] lg:text-[20px]">
              {isPlaying || !isNaN(time.currentTime.minute)
                ? formatTime(time.currentTime.minute, time.currentTime.second)
                : '0:00'}
            </div>
            /
            <div className="text-slate-200 dark:text-slate-400 text-[13px] md:text-[19px] lg:text-[20px]">
              {isPlaying || !isNaN(time.totalTime.minute)
                ? formatTime(time.totalTime.minute, time.totalTime.second)
                : '0:00'}
            </div>
          </div>
          <div className="flex justify-end lg:right-[17%] lg:top-[94px] md:right-[10%] md:top-[90px] absolute top-[14px] right-[10px] gap-3.5 text-slate-200">
            <i className="fa-solid fa-backward text-[23px] lg:text-[27px] cursor-pointer" onClick={previousTrack}></i>
            {isLoading ? (
              <i className="fa-solid fa-spinner text-[23px] lg:text-[27px] cursor-pointer animate-spin"></i>
            ) : isPlaying ? (
              <i className="fa-solid fa-pause text-[23px] lg:text-[27px] cursor-pointer" onClick={pause}></i>
            ) : (
              <i className="fa-solid fa-play text-[23px] lg:text-[27px] cursor-pointer" onClick={play}></i>
            )}
            <i className="fa-solid fa-forward text-[23px] lg:text-[27px] cursor-pointer" onClick={nextTrack}></i>
           
          </div>
          <div className="flex items-center justify-end w-full mt-1 md:mt-0 md:mr-2 lg:mr-4 md:absolute md:bottom-[50px] md:left-[-20px] lg:absolute lg:bottom-[15px]" >
            <i
              className="fa-solid fa-volume-high text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer mr-1 transition-transform duration-200 ease-in-out hover:scale-110"
              title="Adjust volume"
            ></i>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 lg:w-28 transition-all duration-300 ease-in-out cursor-pointer bg-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 h-1.5"
              style={{
                background: `linear-gradient(to right, #00B4D8 ${volume * 100}%, #E5E5E5 ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
