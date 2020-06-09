const express = require("express");
const CourseController = require("../Controller/CourseController");

const Router = express.Router();

Router.route("/")
  .get(CourseController.getAllCourse)
  .post(CourseController.createCourse);

Router.route("/:id")
  .get(CourseController.getCourse)
  .patch(CourseController.updateCourse)
  .delete(CourseController.deleteCourse);

module.exports = Router;
