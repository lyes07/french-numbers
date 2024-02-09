import React from "react";
import NavBar from "./NavBar";
import Body from "./Body";
import api from "./api.js";
import { useState, useEffect } from "react";

function App() {
  const [number, setNumber] = useState([]);

  const getRandomNumber = async () => {
    try {
      const res = await api.get("/");
      setNumber(await res.data.date);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRandomNumber();
  }, []);

  return (
    <>
      <NavBar />
      <Body />
    </>
  );
}

export default App;
