const mongoCollections = require("../config/mongoCollections");
const courses = mongoCollections.courses;
const { ObjectId } = require("mongodb");

const createCourse = async (
  instructorId,
  courseTitle,
  courseId,
  courseDescription,
  courseResourse
) => {
  if (courseTitle.length <= 3) {
    return {
      validation_error: "Please provide name and name of the length must be >3",
    };
  }
  if (courseId.length <= 0) {
    return {
      validation_error: "Please select your country ",
    };
  }
  if (courseDescription.length <= 6) {
    return {
      validation_error:
        "Please write a message and message length must be >6 character length",
    };
  }
  // if (courseResourse.length <= 6) {
  //   return {
  //     validation_error:
  //       "Please write a message and message length must be >6 character length",
  //   };
  // }
  courseId = courseId.toLowerCase();
  doesCourseIdExist = await getUserByCourseId(courseId);
  if (doesCourseIdExist == null) {
    let courses_creation;
    courses_creation = {
      instructorId: instructorId,
      courseTitle: courseTitle,
      courseId: courseId,
      courseDescription: courseDescription,
      courseResourse: [courseResourse],
    };
    console.log("courses_creation", courses_creation);

    const userCollection = await courses();
    const insertInfo = await userCollection.insertOne(courses_creation);
    if (!insertInfo.insertedId)
      return {
        validation_error: "Could not send courses",
      };

    const inserted_user = await getUserById(insertInfo.insertedId);
    console.log("inserted_user", inserted_user);

    return { inserted_user: true };
  } else {
    return { user_exists: true };
  }

  return { error: true };
};
const getUserById = async (id) => {
  const userCollection = await courses();
  const feedack_id = await userCollection.findOne({ _id: ObjectId(id) });
  return feedack_id;
};

const getUserByCourseId = async (courseid) => {
  console.log("searching for " + courseid);
  const userCollection = await courses();
  const course_id = await userCollection.findOne({ courseId: courseid });
  console.log("getUserByUsername", course_id);

  return course_id;
};

const getCourseByInstructorId = async (instructorId) => {
  console.log("searching for " + instructorId);
  const userCollection = await courses();
  const courses_list = await userCollection.find({
    instructorId: "639b803ae5848f8d9a43cd01",
  });
  console.log("getCourseByInstructorId", instructorId);

  return courses_list;
};

const checkCourse = async (courseid) => {
  //if user finds in db, return true
  const courses = await courses();
  const CourseList = await courses.find({}).toArray();
  //var courseCheck = await getUserByCourseId(courseid);
  return CourseList;
};

const getAllCourses = async () => {
  const courseCollection = await courses();
  const courseList = await courseCollection.find({}).toArray();
  if (!courseList) throw "No users in system!";

  //var userCheck = await getUserByUsername();

  // return { courseCollection: true, data: courseList };
  return courseList;
};

module.exports = { createCourse, getAllCourses, getCourseByInstructorId };
