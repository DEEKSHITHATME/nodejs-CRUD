var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    itemname: String,
    quantity: Number
});

var itemModel = mongoose.model('items', itemSchema);

module.exports = itemModel;