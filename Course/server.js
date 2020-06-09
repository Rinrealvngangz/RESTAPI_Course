const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("uncaughtException...shuting down ");
  console.log(err.name, err.message);
  process.exit(1);
});

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
  .then(() => {
    console.log("DB connection successful!");
  });

const server = app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
