var getCourseInputField = document.getElementById("courseInputFields");
var add_more_fields = document.getElementById("add_more_fields");

var remove_fields = document.getElementById("remove_fields");
var count = 0;

add_more_fields.onclick = function () {
  count = count + 1;
  var newField = document.createElement("input");
  newField.setAttribute("type", "text");
  newField.setAttribute("name", "courseInput");
  newField.setAttribute("id", "courseInput");
  newField.setAttribute("class", "courseInputFields");
  newField.setAttribute("size", 100);
  newField.setAttribute("placeholder", "Add resources");
  getCourseInputField.appendChild(newField);
};

remove_fields.onclick = function () {
  var input_tags = getCourseInputField.getElementsByTagName("input");
  if (input_tags.length > 2) {
    getCourseInputField.removeChild(input_tags[input_tags.length - 1]);
  }
};
