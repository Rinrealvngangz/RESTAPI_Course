const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const KhoaHocModel = require("../models/KhoaHocModel");

dotenv.config({ path: "./config.env" });
const db = process.env.CONECTION_MONGODB.replace(
  "<password>",
  process.env.PASS
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection success..."));

const KhoaHoc = JSON.parse(
  fs.readFileSync(`${__dirname}/dataAll.json`, "utf-8")
);

const importData = async () => {
  try {
    await KhoaHocModel.create(KhoaHoc);
    console.log("import Data success");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await KhoaHocModel.deleteMany();
    console.log("Delete success");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
