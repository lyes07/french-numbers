require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./connect.js");
const app = express();
const port = process.env.PORT || 5000;
/* const fs = require("fs");
const path = require("path");
const OpenAI = require("openai"); */

// the max number of boxes in the game grid
const gameBoxLimit = 6;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    credentials: true,
  })
);

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get("/api/v1/:lang/", async (req, res) => {
  try {
    const lang = req.params.lang;
    const random = randomInt(101);
    const q = "SELECT * FROM " + lang + " WHERE id=$1";
    const randomRow = await db.query(q, [random]);
    res.status(200).json({
      status: "success",
      length: randomRow.rowCount,
      data: randomRow.rows,
    });
  } catch (error) {
    console.log("Can't SELECT for the database");
    console.log(error);
    res.status(4).json({
      status: "fail",
    });
  }
});

app.get("/api/v1/:lang/game/", async (req, res) => {
  try {
    const lang = req.params.lang;
    const q =
      "SELECT id,word FROM get_random_rows($1, $2) AS (id integer, word varchar(100), audio text)";
    const rows = await db.query(q, [lang, gameBoxLimit]);
    res.status(200).json({
      status: "success",
      length: rows.rowCount,
      data: rows.rows,
    });
  } catch (error) {
    console.log("Can't SELECT for the database");
    console.log(error);
    res.status(4).json({
      status: "fail",
    });
  }
});

app.get("/", async (req, res) => {
  res.json("App is running");
});

/* 
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const speechFile = path.resolve("./speech.mp3");

async function AItextToSpeech() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
} 
*/

app.listen(port, () =>
  console.log(`french numbers server listening on port ${port}`)
);
