require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./connect.js");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(port, () =>
  console.log(`french numbers server listening on port ${port}`)
);
