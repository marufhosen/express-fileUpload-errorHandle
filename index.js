const express = require("express");
const multer = require("multer");
const path = require("path");
const port = 5000;

//file upload folder
const UPLOAD_FOLDER = "./uploads";

//define upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

//upload file object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "uploaderfile") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only jpg, jpeg or png file allowed"));
      }
    } else if (file.fieldname === "document") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only PDF Allwoed"));
      }
    } else {
      cb(new Error("There was an unknown error"));
    }
  },
});

const app = express();

// upload route
app.post(
  "/",
  upload.fields([
    { name: "uploaderfile", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log(req.files);
    res.send("Uploaded Successfully");
  }
);

//upload error handling
app.use("/", (err, req, res, next) => {
  if (err.message) {
    if (err instanceof multer.MulterError) {
      res.status(500).send({ err: err.message });
    } else {
      res.status(500).send({ err: err.message });
    }
  } else {
    res.status(500).send("There was an error");
  }
});

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});
