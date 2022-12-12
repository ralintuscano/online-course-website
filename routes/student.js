const express = require('express');
const router = express.Router();

console.log("inside this file")

router.get('/', async (req, res) => {
  try {
   console.log("INSIDE",req.session);
    res.render("student/courseList", {isLoggedIn: req.session.user});
  } catch (e) {
    res.status(500).json({ error: '' });
  }
});


module.exports = router;