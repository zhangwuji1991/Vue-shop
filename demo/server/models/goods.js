var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "productId":{type:String},
    "producName":String,
    "salePrice":"Number",
    "productImage":String
});


module.exports = mongoose.model("Good" , produtSchema);