const mongoose = require("mongoose");

const KhoaHocSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "You must have link"],
    maxlength: 900,
    select: false,
    unique: true,
  },

  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "You must have title course"],
  },
  Description: String,
  Date: { type: Date, default: Date.now() },
  name: { type: [String], required: [true, "You must have name course"] },
});

const KhoaHoc = mongoose.model("course", KhoaHocSchema);
module.exports = KhoaHoc;
