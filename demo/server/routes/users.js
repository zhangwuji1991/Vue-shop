var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req, res, next) {
  res.send("dadad");
});

router.post("/login", function(req, res, next) {

  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne(param, function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });
         res.cookie("userName", doc.userName, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName
          }
        });
      }
    }
  });
});

router.post("/logout", function(req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: "",
    result: ""
  });
});

router.get("/checkLogin",function(req,res,next){
  console.log(req.cookies.userId)
  if(req.cookies.userId){
    console.log(1)
      res.json({
        status: "0",
        msg: "",
        result: req.cookies.userName || ''
      });
  }else{
      res.json({
        status: "1",
        msg: "未登录",
        result: ""
     });
  }
})
module.exports = router;
