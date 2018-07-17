var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Goods = require("../models/goods");
var User = require("../models/user");

/* GET home page. */
router.get("/list", function(req, res, next) {
  //分页
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page - 1) * pageSize;
  let priceGt = "",
    priceLte = "";
  let params = {};
  console.log(priceLevel);
  if (priceLevel != "all") {
    switch (priceLevel) {
      case "0":
        priceGt = 0;
        priceLte = 100;
        break;
      case "1":
        priceGt = 100;
        priceLte = 500;
        break;
      case "2":
        priceGt = 500;
        priceLte = 1000;
        break;
      case "3":
        priceGt = 1000;
        priceLte = 2000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    };
  }

  let goodsModel = Goods.find(params)
    .skip(skip)
    .limit(pageSize);
  goodsModel.sort({ salePrice: sort });
  goodsModel.exec(function(err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      res.json({
        status: "0",
        msg: "获取数据成功",
        result: {
          count: doc.length,
          list: doc
        }
      });
      // })
    }
  });
});

//加入购物车
router.post("/addCart", function(req, res, next) {
  var userId = "100000077",
    productId = req.body.productId;
  User.findOne({ userId: userId }, function(err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (userDoc) {
        let goosItem = "";
        userDoc.cartList.forEach(function(item) {
          if (item.productId == productId) {
            goosItem = item;
            item.productNum++;
            console.log(item.productNum);
          }
        });
        if (goosItem) {
          userDoc.save(function(err2, doc2) {
            if (err) {
              res.json({
                status: "1",
                msg: err2.message
              });
            } else {
              res.json({
                status: "0",
                result: "suc"
              });
            }
          });
        } else {
          Goods.findOne({ productId: productId }, function(err1, doc) {
            // console.log(doc);
            if (err) {
              res.json({
                status: "1",
                msg: err1.message
              });
            } else {
              if (doc) {
                var obj = doc.toObject();
                obj.productNum = 1;
                obj.checked = 1;
                userDoc.cartList.push(obj);
                console.log(obj);
                userDoc.save(function(err, doc2) {
                  if (err) {
                    res.json({ status: "1", msg: err.message });
                  } else {
                    res.json({
                      status: "0",
                      msg: "",
                      result: "sucs"
                    });
                  }
                });
              }
            }
          });
        }
      }
    }
  });
});
module.exports = router;
