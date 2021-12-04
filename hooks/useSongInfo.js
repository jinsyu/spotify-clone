import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import spotifyApi from "../lib/spotify";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotify = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [volume, setVolume] = useState(50);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSonginfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotify.getAccessToken()}`,
          },
        }).then((resp) => resp.json());

        setSongInfo(trackInfo);
      }
    };
    fetchSonginfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
