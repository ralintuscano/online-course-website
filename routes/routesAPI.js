//require express, express router and bcrypt as shown in lecture code
const e = require("express");
const express = require("express");
const router = express.Router();
const userss = require("../data/users");
const feedbacks = require("../data/feedback");

router.route("/").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.redirect("/protected");
  } else {
    res.render("student/userLogin", { title: "User Login" });
  }
});

//profile route
router.route("/profile").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("student/user_profile", {
      title: "profile page",
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
    res.render("student/userLogin", { title: "User Login" });
  }
});

router.route("/home").get(async (req, res) => {
  //code here for GET

  if (req.session.user) {
    fname: req.session.fname,
      res.render("student/home", {
        title: "Home Page",
        fname: req.session.fname,
      });
  } else {
    res.render("student/userLogin", { title: "User Login" });
  }
});

// route to my course
router.route("/mycourse_list").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("student/mycourse_list", { title: "My Course List Page" });
  } else {
    res.render("userLogin", { title: "User Login" });
  }
});

// route to my about page
router.route("/aboutpage").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("student/aboutpage", { title: "About Page" });
  } else {
    res.render("student/userLogin", { title: "User Login" });
  }
});

// route to my connect // social media
router.route("/social_media").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("student/social_media", { title: "Social Media Page" });
  } else {
    res.render("student/userLogin", { title: "User Login" });
  }
});
// route to my feedbackform
router
  .route("/feedbackform")
  .get(async (req, res) => {
    //code here for GET
    let name = req.session.fname + req.session.lname;
    if (req.session.user) {
      res.render("student/feedbackform", {
        name,
        title: "feedback  Page",
      });
    } else {
      res.render("student/userLogin", { title: "User Login" });
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
        res.render("student/userRegister", {
          title: "register",
          error_msg: "Internal Server Error",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
// route to my askqq
router.route("/ask_question").get(async (req, res) => {
  //code here for GET
  if (req.session.user) {
    res.render("student/ask_question", { title: "Ask Question Page" });
  } else {
    res.render("student/userLogin", { title: "User Login" });
  }
});

router
  .route("/register")
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      res.redirect("/protected");
    } else {
      res.render("student/userRegister", { title: "register" });
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
      var registration_response = await userss.createUser(
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
        res.redirect("/");
      } else if ("user_exists" in registration_response) {
        res.status(400);
        res.render("student/userRegister", {
          title: "register",
          error_msg: " User Already Exist",
        });
      } else if ("validation_error" in registration_response) {
        res.status(400);
        res.render("student/userRegister", {
          title: "register",
          error_msg: registration_response.validation_error,
        });
      } else {
        res.status(500);
        res.render("student/userRegister", {
          title: "register",
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
    var registration_response = await userss.checkUser(
      user_data,
      password_data
    );
    console.log("registration_response", registration_response);

    if ("authenticatedUser" in registration_response) {
      //create a session
      console.log(
        "my user logged in=",
        registration_response.data._id.toString()
      );
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
      res.redirect("/");
    } else if ("validation_error" in registration_response) {
      res.status(400);
      res.render("student/userLogin", {
        title: "User Login",
        error_msg: registration_response.validation_error,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/protected").get(async (req, res) => {
  //code here for GET
  date_time = Date();
  if (req.session.user) {
    res.render("student/student_private", {
      title: "Welcome",
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
router.route("/editUser").get(async (req, res) => {
  //code here for GET
  //
  if (req.session.user) {
    res.render("student/editUser", {
      title: "Edit user page",
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
    res.render("student/userLogin", { title: "User Login" });
  }
});

//update user
router.post("/updateUser", async (req, res) => {
  //code here for POST
  //get data and save to database

  const id_data = req.session.idData;
  console.log("id passed is", id_data);
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
    var registration_response = await userss.updateRecord(
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
    console.log("registration_response", registration_response);

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
      res.redirect("/profile");
    } else if ("validation_error" in registration_response) {
      res.status(400);
      res.render("student/editUser", {
        title: "edit user",
        error_msg: registration_response.validation_error,
      });
    } else {
      res.render("student/userLogin", { title: "User Login" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
