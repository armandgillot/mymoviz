// CONNEXION BDD
var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('',
      options,        
      function(err) {
       console.log(err);
      }
   );