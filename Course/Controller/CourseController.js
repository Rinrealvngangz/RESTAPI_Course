const KhoaHocModel = require("../models/KhoaHocModel");

exports.getAllCourse = async (req, res) => {
  try {
    let data;
    let name;

    if (req.query.name === "c") {
      req.query.name = "cpp";
    }
    name = new RegExp(`^${req.query.name}$`, "i");

    const queryobj = [
      { name: name }, //khong pb chu hoa ,chu thuong
      req.query.sort,
      req.query.limit * 1,
    ];
    console.log(req.query.name);

    if (req.query.name) {
      data = await KhoaHocModel.find(queryobj[0])
        .sort(queryobj[1])
        .limit(queryobj[2]);
    } else {
      data = await KhoaHocModel.find()

        .sort(queryobj[1])
        .limit(queryobj[2]);
    }
    if (data.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "course not found",
      });
    } else {
      res.status(200).json({
        status: "sucess",
        data: {
          result: data.length,
          course: data,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const data = await KhoaHocModel.findById(req.params.id)
      .select("title")
      .select("link");
    if (data === null) {
      res.status(404).json({
        status: "fail",
        message: "The course has been deleted",
      });
    } else {
      res.status(200).json({
        status: "sucess",
        data,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "id invalid .Please check id ! ",
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const createCourse = req.body;
    const course = await KhoaHocModel.create(createCourse);
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const data = await KhoaHocModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await KhoaHocModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};
