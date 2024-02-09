import React from "react";
import api from "./api.js";
import { useState, useEffect } from "react";

function Body() {
  const [num, setNum] = useState({ audio: "hhhe", id: 1, word: "ww" });

  const getRandomNumber = async () => {
    try {
      const res = await api.get("/");
      setNum(res.data.data[0]);
      console.log(res.data.data[0]);
      console.log(num);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log(num);
      after();
    }
  };

  useEffect(() => {
    getRandomNumber();
    console.log(num);
    after();
  }, []);

  function after() {
    console.log(num);
  }
  return (
    <div className='container'>
      <>
        <div>
          <button id='playButton' /* onClick='toggleAudio()' */>
            <i className='glyphicon glyphicon-play'></i> uuu
          </button>
          <audio id='myAudio' src='your-audio-file.mp3'></audio>
        </div>
      </>
      <h1>ttt</h1>
      <h1>222</h1>
    </div>
  );
}

export default Body;
