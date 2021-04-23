var express = require('express');
var router = express.Router();
var request = require('sync-request');
var mongoose = require('mongoose');
require('../models/bdd');
var wishlistModel = require('../models/wishlist');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* NEW MOVIES */
router.get('/new-movie', function (req, res, next) {

  var requete = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key=c20e85dfb96a6f227deaeb68fb253ba4&language=fr-FR&sort_by=popularity.desc&include_image_language=fr");
  var result = JSON.parse(requete.body);

  res.json({result : result.results});
});

/* WISHLIST ADD */
router.post('/wishlist-movie', async (req, res, next) => {

  // var requete = request("GET", `https://api.themoviedb.org/3/movie/${req.body.idmovie}?api_key=c20e85dfb96a6f227deaeb68fb253ba4&language=fr-FR&include_image_language=fr`);
  // var result = JSON.parse(requete.body);
  // console.log(result);
  // var newWishlist = new wishlistModel({
  //    name: result.original_title,
  //    image: "https://image.tmdb.org/t/p/w500" + result.poster_path
  //  });
  //  var wishlistSaved = await newWishlist.save();

   var newWishlist = new wishlistModel({
    name: req.body.name,
    image: req.body.imageUrl
  });
  var wishlistSaved = await newWishlist.save();

  res.json({wishlistSaved});
});

/* WISHLIST DELETE */
router.delete('/wishlist-movie/:name', async (req, res, next) => {

   await wishlistModel.deleteOne(
    { name: req.params.name }
  );

  var result = false
  if(returnDb.deletedCount == 1){
    result = true
  }

  res.json({result})
});

/* WISHLIST READ */
router.get('/wishlist-movie', async (req, res, next) => {

  var wishlist = await wishlistModel.find();

  res.json({wishlist});
});


module.exports = router;
