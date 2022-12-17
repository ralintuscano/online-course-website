//require express, express router and bcrypt as shown in lecture code
const e = require("express");
const express = require("express");
const router = express.Router();
const intructors = require("../data/instructor");
const feedbacks = require("../data/feedback");
const coursess = require("../data/courses");

router.route("/").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.redirect("/instructor/instructor_protected");
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

//profile route
router.route("/instructor_profile").get(async (req, res) => {
  //code here for GET
  date_time = Date();
  let name = req.session.fname + req.session.lname;
  if (req.session.user) {
    res.render("instructor/instructorUserProfile", {
      name,
      userType: req.session.userType,
      title: "instructor profile page",
      date_time: date_time,
      fname: req.session.fname,
      lname: req.session.lname,
      user: req.session.user,
      email: req.session.email,
      dob: req.session.dob,
      gender: req.session.gender,
      saddress: req.session.saddress,
      city: req.session.city,
      zipcode: req.session.zipcode,
      country: req.session.country,
      phonenumber: req.session.phonenumber,
    });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

router.route("/IntructorHome").get(async (req, res) => {
  //code here for GET

  if (req.session.user) {
    // fname: req.session.fname,

    res.render("instructor/instructorHome", {
      userType: req.session.userType,
      title: "Home Page",
      fname: req.session.fname,
    });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

// route to my course
router.route("/instructor_mycourse_list").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("instructor/instructorCourseList", {
      userType: req.session.userType,
      title: "My Course List Page",
    });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

// route to my about page
router.route("/aboutpage").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("instructor/aboutpage", {
      userType: req.session.userType,
      title: "About Page",
    });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

// route to my connect // social media
router.route("/social_media").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("instructor/social_media", { title: "Social Media Page" });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

// route to my create course
// router
//   .route("/createCourse")
//   .get(async (req, res) => {
//     //code here for GET
//     let name = req.session.fname + req.session.lname;
//     if (req.session.user) {
//       res.render("instructor/createCourse", {
//         userType: req.session.userType,
//         title: "Create Course Page",
//         name,
//       });
//     } else {
//       res.render("instructor/instructorLogin", { title: "instructor Login" });
//     }
//   })
//   .post(async (req, res) => {
//     const id_data = req.session.idData;
//     //fname+lname
//     const course_name = req.body.courseNameInput;
//     //select country
//     const description_name = req.body.descriptionInput;
//     //message
//     const courseid_name = req.body.courseIdInput;
//     const resourse_name = req.body.courseInput;

//     try {
//       //Create a User by sending u and p.
//       var registration_response = await coursess.createCourse(
//         id_data,
//         course_name,
//         courseid_name,
//         description_name,
//         resourse_name
//       );

//       //course-data
//       req.session.courseTitle = registration_response.data.courseTitle;
//       req.session.courseId = registration_response.data.courseId;
//       req.session.courseDescription =
//         registration_response.data.courseDescription;
//       req.session.courseResourse = registration_response.data.courseResourse;

//       console.log("registration_response", registration_response);

//       //     if ("inserted_user" in registration_response) {
//       //       res.redirect("/");
//       //     } else {
//       //       res.status(500);
//       //       res.render("instructor/instructor_private", {
//       //         title: "register",
//       //         error_msg: "Internal Server Error",
//       //       });
//       //     }
//       //   } catch (e) {
//       //     console.log(e);
//       //   }
//       // });
//       if ("inserted_user" in registration_response) {
//         res.redirect("/");
//       } else if ("user_exists" in registration_response) {
//         res.status(400);
//         res.render("instructor/createCourse", {
//           userType: req.session.userType,
//           title: "instructor course",
//           error_msg: " Course Already Exist",
//         });
//         return;
//       } else if ("validation_error" in registration_response) {
//         res.status(400);
//         res.render("instructor/createCourse", {
//           userType: req.session.userType,
//           title: "instructor course",
//           error_msg: registration_response.validation_error,
//         });
//         return;
//       } else {
//         res.status(500);
//         res.render("instructor/createCourse", {
//           userType: req.session.userType,
//           title: "instructor course",
//           error_msg: "Internal Server Error",
//         });
//         return;
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   });
// route to my feedbackform
router
  .route("/instructorFeedbackform")
  .get(async (req, res) => {
    //code here for GET
    let name = req.session.fname + req.session.lname;
    if (req.session.user) {
      res.render("instructor/instructorFeedbackform", {
        userType: req.session.userType,
        title: "Feedback Form Page",
        name,
      });
    } else {
      res.render("instructor/instructorLogin", { title: "instructor Login" });
    }
  })
  .post(async (req, res) => {
    const id_data = req.session.idData;
    //fname+lname
    const full_name = req.body.fullnameInput;
    //select country
    const country_name = req.body.countryInput;
    //message
    const message_name = req.body.messageInput;

    try {
      //Create a User by sending u and p.
      var registration_response = await feedbacks.sendFeedback(
        id_data,
        full_name,
        country_name,
        message_name
      );

      console.log("registration_response", registration_response);

      if ("inserted_user" in registration_response) {
        res.redirect("/");
      } else {
        res.status(500);
        res.render("instructor/instructor_private", {
          title: "register",
          error_msg: "Internal Server Error",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

router
  .route("/instructor_register")
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      res.redirect("/instructor_protected");
    } else {
      res.render("instructor/instructorRegister", {
        userType: req.session.userType,
        title: "Instructor Register",
      });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    //get data and save to database

    //fname+lname
    const fname_data = req.body.firstnameInput;
    const lname_data = req.body.lastnameInput;

    //username
    const user_data = req.body.usernameInput;

    //email
    const email_data = req.body.emailInput;

    //dob
    const dob_data = req.body.birthdayInput;

    //gender
    const gender_data = req.body.genderInput;

    //address
    const street_address_data = req.body.street_addressInput;
    const city_data = req.body.cityInput;
    const postal_code_data = req.body.postal_codeInput;
    const country_data = req.body.countryInput;

    //phone
    const phone_data = req.body.phoneInput;

    //password
    const password_data = req.body.passwordInput;
    // res.render("userRegister", { user: data });

    //printing user data
    console.log("fname_data", fname_data);
    console.log("lname_data", lname_data);
    console.log("user_data", user_data);
    console.log("email_data", email_data);
    console.log("dob_data", dob_data);
    console.log("gender_data", gender_data);
    console.log("street_address_data", street_address_data);
    console.log("city_data", city_data);
    console.log("postal_code_data", postal_code_data);
    console.log("country_data", country_data);
    console.log("phone_data", phone_data);
    console.log("password_data", password_data);

    try {
      //Create a User by sending u and p.
      var registration_response = await intructors.createUser(
        fname_data,
        lname_data,
        user_data,
        email_data,
        dob_data,
        gender_data,
        street_address_data,
        city_data,
        postal_code_data,
        country_data,
        phone_data,
        password_data
      );

      console.log("registration_response", registration_response);

      if ("inserted_user" in registration_response) {
        res.redirect("/instructor/instructor_profile");
      } else if ("user_exists" in registration_response) {
        res.status(400);
        res.render("instructor/instructorRegister", {
          userType: req.session.userType,
          title: "instructor register",
          error_msg: " User Already Exist",
        });
      } else if ("validation_error" in registration_response) {
        res.status(400);
        res.render("instructor/instructorRegister", {
          userType: req.session.userType,
          title: "instructor register",
          error_msg: registration_response.validation_error,
        });
      } else {
        res.status(500);
        res.render("instructor/instructorRegister", {
          userType: req.session.userType,
          title: "instructor register",
          error_msg: "Internal Server Error",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

router.route("/login").post(async (req, res) => {
  //code here for POST
  //get login info, verify and then create session and redirect to private page
  //code here for POST
  //get data and save to database

  // res.render("userRegister", { user: data });

  //fname+lname
  const fname_data = req.body.firstnameInput;
  const lname_data = req.body.lastnameInput;

  //username
  const user_data = req.body.usernameInput;

  //email
  const email_data = req.body.emailInput;

  //dob
  const dob_data = req.body.birthdayInput;

  //gender
  const gender_data = req.body.genderInput;

  //address
  const street_address_data = req.body.street_addressInput;
  const city_data = req.body.cityInput;
  const postal_code_data = req.body.postal_codeInput;
  const country_data = req.body.countryInput;

  //phone
  const phone_data = req.body.phoneInput;

  //password
  const password_data = req.body.passwordInput;

  try {
    //Create a User by sending u and p.
    var registration_response = await intructors.checkUser(
      user_data,
      password_data
    );
    console.log("registration_response", registration_response);

    // var course_response = await coursess.getAllCourses();

    if ("authenticatedUser" in registration_response) {
      //create a session
      console.log(
        "my user logged in=",
        registration_response.data._id.toString()
      );
      //   req.session.userType = "instructor";
      req.session.idData = registration_response.data._id;
      // req.session.id = registration_response.data._id;
      req.session.fname = registration_response.data.firstnameData;
      req.session.lname = registration_response.data.lastnameData;
      req.session.user = registration_response.data.usernameData;
      req.session.email = registration_response.data.emailData;
      req.session.dob = registration_response.data.dobData;
      req.session.gender = registration_response.data.genderData;
      req.session.saddress = registration_response.data.streetaddressData;
      req.session.city = registration_response.data.cityData;
      req.session.zipcode = registration_response.data.zipcodeData;
      req.session.country = registration_response.data.country;
      req.session.phonenumber = registration_response.data.phonenumberData;
      //req.session.user = user_data;

      // req.session.courseTitle = course_response[0][2].data.courseTitle;
      // req.session.courseId = course_response[0][1].data.courseId;
      // req.session.courseDescription =
      //   course_response[0][3].data.courseDescription;

      //course list
      //course-data

      res.redirect("/instructor");
      // } else if ("courseCollection" in course_response) {
      //   req.session.courseTitle = course_response.data.courseTitle;
      //   req.session.courseId = course_response.data.courseId;
      //   req.session.courseDescription = course_response.data.courseDescription;
      //   // req.session.courseResourse = registration_response.data.courseResourse;
      // } else if ("validation_error" in registration_response) {
      res.status(400);
      res.render("instructor/instructorLogin", {
        userType: req.session.userType,
        title: "instructor Login",
        error_msg: registration_response.validation_error,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/instructor_protected").get(async (req, res) => {
  //code here for GET
  // res.render("instructor/instructor_private");
  date_time = Date();
  let name = req.session.fname + req.session.lname;
  var id = req.session.idData;
  console.log("loggedin id", id);
  var course_list = await coursess.getAllCourses(); //getCourseByInstructorId(id);
  console.log("coureses_listtt", course_list);
  if (req.session.user) {
    res.render("instructor/instructor_private", {
      userType: req.session.userType,
      title: "Welcome",
      // date_time: date_time,
      courses: course_list,
      fullname: name,
    });
  } else {
    res.render("forbiddenAccess", { title: "Error" });
  }
  //check if user is logged in
  //if yes -
  // if no
});

router.route("/logout").get(async (req, res) => {
  //code here for GET
  //Destroy session
  req.session.destroy();
  res.render("logout", { title: "Logout" });
});

//edit user
router.route("/instructorEditUser").get(async (req, res) => {
  //code here for GET
  //
  if (req.session.user) {
    res.render("instructor/instructorEditUser", {
      userType: req.session.userType,
      title: "Edit Instructor Page",
      date_time: date_time,
      fname: req.session.fname,
      lname: req.session.lname,
      user: req.session.user,
      email: req.session.email,
      dob: req.session.dob,
      gender: req.session.gender,
      saddress: req.session.saddress,
      city: req.session.city,
      zipcode: req.session.zipcode,
      country: req.session.country,
      phonenumber: req.session.phonenumber,
    });
  } else {
    res.render("instructor/instructorLogin", { title: "instructor Login" });
  }
});

//update user
router.post("/updateInstructorUser", async (req, res) => {
  //code here for POST
  //get data and save to database

  const id_data = req.session.idData;
  console.log("instructor id passed is", id_data);
  //fname+lname
  const fname_data = req.body.firstnameInput;
  const lname_data = req.body.lastnameInput;

  //username
  const user_data = req.body.userInput;

  //email
  const email_data = req.body.emailInput;

  //dob
  const dob_data = req.body.dobInput;

  //gender
  const gender_data = req.body.genderInput;

  //address
  const street_address_data = req.body.addressInput;
  const city_data = req.body.cityInput;
  const postal_code_data = req.body.zipcodeInput;
  const country_data = req.body.countryInput;

  //phone
  const phone_data = req.body.phonenumberInput;

  //password
  const password_data = req.body.passwordInput;
  // res.render("userRegister", { user: data });

  //printing user data

  try {
    //Create a User by sending u and p.
    var registration_response = await intructors.updateRecord(
      id_data,
      fname_data,
      lname_data,
      dob_data,
      gender_data,
      street_address_data,
      city_data,
      postal_code_data,
      country_data
    );
    console.log("instructor registration_response", registration_response);

    if ("updatedInfo" in registration_response) {
      //create a session
      req.session.idData = registration_response.data._id;
      // req.session.id = registration_response.data._id;
      req.session.fname = registration_response.data.firstnameData;
      req.session.lname = registration_response.data.lastnameData;
      req.session.user = registration_response.data.usernameData;
      req.session.email = registration_response.data.emailData;
      req.session.dob = registration_response.data.dobData;
      req.session.gender = registration_response.data.genderData;
      req.session.saddress = registration_response.data.streetaddressData;
      req.session.city = registration_response.data.cityData;
      req.session.zipcode = registration_response.data.zipcodeData;
      req.session.country = registration_response.data.country;
      req.session.phonenumber = registration_response.data.phonenumberData;
      //req.session.user = user_data;
      console.log("now redirecting");
      res.redirect("instructor_profile");
    } else if ("validation_error" in registration_response) {
      res.status(400);
      res.render("instructor/instructorEditUser", {
        userType: req.session.userType,
        title: "instructor edit user",
        error_msg: registration_response.validation_error,
      });
    } else {
      res.render("instructor/instructorLogin", { title: "instructor Login" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
