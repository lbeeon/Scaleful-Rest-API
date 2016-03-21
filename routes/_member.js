'use strict';
var express = require("express");

var _post = function(req, res){
    res.send("Hello Post");
}

var _get = function(req, res){
    res.send("Hello Get");
}


var middleware = function(req, res, next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('token----------');
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}


var router_list = [
    /*[method, path, middleware, callback]*/
    ['post' , '/member'  ,   middleware,   _post],
    ['get'  , '/member'  ,   middleware,   _get]

]

var routes = function(){
    var appRouter = express.Router();

    router_list.forEach(function(elem){
      switch(elem[0]){
        case "post":
          appRouter.post(elem[1], elem[2] || elem[3], elem[3]);
          break;
        case "get":
          appRouter.get(elem[1], elem[2] || elem[3], elem[3]);
          break;
        case "put":
          break;
        case "delete":
          break;
      }
    });
    return { "is_routes": true, "appRouter": appRouter}
};


module.exports = routes();