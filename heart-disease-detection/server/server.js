const express = require("express");
const multer = require("multer");
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.fields([{ name: "image" }, { name: "json" }]), (req, res) => {
  try {
    const imagePath = req.files["image"][0].path;
    const jsonPath = req.files["json"][0].path;

    console.log("Image Path:", imagePath);
    console.log("JSON Path:", jsonPath);

    // Run the PyTorch script
    const pythonProcess = spawn("python", ["predict.py", imagePath, jsonPath]);

    let results = "";

    pythonProcess.stdout.on("data", (data) => {
      results += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Error:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        res.status(200).json({ message: "Prediction successful", results: JSON.parse(results) });
      } else {
        res.status(500).json({ error: "Prediction failed" });
      }
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000...");
});
