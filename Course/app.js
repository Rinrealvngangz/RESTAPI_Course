const express = require("express");
const app = express();
const morgan = require("morgan");
const CourseRouter = require("./Router/CourseRouter");
const swagger_ui = require("swagger-ui-express");
const swagger_JsDoc = require("swagger-jsdoc");

const swaggerOpition = {
  swaggerDefinition: {
    info: {
      title: "RestAPI course ",
      description: "API course download free",
      contact: {
        name: "rin developer",
      },
      server: ["http://localhost:3000"],
    },
  },
  apis: ["app.js"],
};

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Server start...");
  next();
});
app.use((req, res, next) => {
  const requestTime = new Date().toString();
  console.log(requestTime);
  next();
});

app.use((req, res, next) => {
  console.log("hello Course");
  next();
});

const swaggerDoc = swagger_JsDoc(swaggerOpition);
// update sau
app.use("/api-docs", swagger_ui.serve, swagger_ui.setup(swaggerDoc));
// follow theo đường dẫn
app.use("/api/v1/KhoahocLaptrinh", CourseRouter);

module.exports = app;
