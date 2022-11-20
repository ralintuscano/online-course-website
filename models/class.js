var mongoose = require("mongoose");

//class schema
var classSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  instructor: { type: String },
  lessons: [
    {
      lesson_number: { type: Number },
      lesson_title: { type: String },
      lesson_body: { type: String },
    },
  ],
});

var Class = (module.export = mongoose.model("Class", classSchema));

//fetch all class
module.export.getClasses = function(callback, limit) {
  Class.find(callback).limit(limit);
};

//fetch single class
module.exports.getClassById = function(id, callback) {
  Class.findById(id, callback);
};
