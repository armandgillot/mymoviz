var mongoose = require('mongoose');

var wishlistSchema = mongoose.Schema({
    name: String,
    image: String,
  });
 
 var wishlistModel = mongoose.model('wishlist', wishlistSchema);

 module.exports = wishlistModel;