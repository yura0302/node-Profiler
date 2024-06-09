const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql");
const { std, mean, max, min } = require("mathjs");

const app = express();
const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "akdrhTkfkd9096!",
  database: "profiler_db",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("DB 연결 실패:", err.stack);
    return;
  }
  console.log("DB 연결 성공");
});

app.use(express.static("public"));
app.use(express.json());

app.post("/upload", upload.single("inputFile"), (req, res) => {
  const filePath = req.file.path;
  let results = [];

  fs.createReadStream(filePath)
    .pipe(csv({ separator: "\t" }))
    .on("data", (data) => {
      let row = {};
      for (let key in data) {
        if (data[key]) {
          row[key] = Number(data[key]);
        }
      }
      results.push(row);
    })
    .on("end", () => {
      processAndStoreData(results, (stats) => {
        res.json(stats);
      });

      // 파일 처리 후 삭제
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`파일 삭제 오류 : ${filePath}`);
        } else {
          console.log(`파일 삭제 성공 : ${filePath}`);
        }
      });
    });
});

function processAndStoreData(data, callback) {
  let stats = [];
  let taskIndex = 1;

  for (let i = 0; i < data.length; i += 5) {
    for (let core = 1; core <= 5; core++) {
      let coreData = [];
      for (let j = i; j < i + 5; j++) {
        if (data[j] && !isNaN(data[j][`task${core}`])) {
          coreData.push(data[j][`task${core}`]);
        }
      }

      if (coreData.length === 0) {
        coreData = [0];
      }

      let coreStats = {
        task: `task${taskIndex}`,
        core: `core${core}`,
        min: min(coreData),
        max: max(coreData),
        avg: mean(coreData),
        stddev: std(coreData),
      };

      stats.push(coreStats);
      db.query("INSERT INTO profiler_stats SET ?", coreStats, (err, res) => {
        if (err) throw err;
      });
    }
    taskIndex++;
  }
  callback(stats);
}

app.get("/stats", (req, res) => {
  db.query("SELECT * FROM profiler_stats", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 대기 중");
});
