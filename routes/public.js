'use strict';
var express = require("express");

var _post = function(req, res){
    res.send("Hello Post");
}

var _get = function(req, res){
    res.send("Hello Get");
}

var router_list = [
    /*[method, path, middleware, callback]*/
    ['post' , '/user'  ,   null,   _post],
    ['get'  , '/user'  ,   null,   _get]

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