"use client";
import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [playerId, setPlayerId] = useState(localStorage.getItem("playerId"));

  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
export const usePlayer = () => useContext(PlayerContext);