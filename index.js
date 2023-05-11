const bodyParser = require("body-parser");
const port = 8000;

const express = require("express");
const cookie = require("cookie-parser");

const routes = require("./routes");

const app = express();

const multer = require("multer");
const upload = multer({
  dest: "image",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please uplaod an image."));
    }
    cb(undefined, true);
  },
});

image: {
  type: Buffer;
}

app.post(
  "/uplaod",
  upload.single("upload"),
  async (req, res) => {
    try {
      const incident = await Incident.findById(req.body.id);
      incident.image = req.file.buffer;
      incident.save();
      res.send;
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.delete("/upload", async (req, res) => {
  try {
    const incident = await Incident.findById(req.body.id);
    incident.image = undefined;
    incident.save();
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

app.use(cookie());

app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("*", (req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Serveur NodeJS écoutant sur le port ${port}`);
});
