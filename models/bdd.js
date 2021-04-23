// CONNEXION BDD
var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://armandgillot:jyd1Y3XNIDCqoi7Q@cluster0.gif5n.mongodb.net/mymovizapp?retryWrites=true&w=majority',
      options,        
      function(err) {
       console.log(err);
      }
   );