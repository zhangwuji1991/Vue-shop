var mongoose = require("mongoose");

var usertSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [
    {
      productId: String,
      productName: String,
      salePrice: String,
      productImage: String,
      checked: String,
      productNum: String
    }
  ],
  addressList: String
});

module.exports = mongoose.model("User", usertSchema);
