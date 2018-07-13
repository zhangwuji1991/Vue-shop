var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var Goods    = require('../models/goods');

/* GET home page. */
router.get('/', function(req, res, next) {
  //分页
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let priceGt = '', priceLte = '';
  console.log(priceLevel)
  if(priceLevel!="all"){
    switch (priceLevel){
      case '0' :priceGt = 0;priceLte = 100;break;
      case '1' :priceGt = 100;priceLte = 500;break;
      case '2' :priceGt = 500;priceLte = 1000;break;
      case '3' :priceGt = 1000;priceLte = 2000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }

  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort})
  goodsModel.exec(function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      // new Goods({
      //   productId:'201710003',
      //   productName:'平衡车',
      //   salePrice:'1999',
      //   productImage:'pingheng.jpg'
      // }).save().then(function(){
        res.json({
          status:'0',
          msg:'获取数据成功',
          result:{
            count: doc.length,
            list:doc
          }
        })
      // })
    
    }
  })
});

module.exports = router;
