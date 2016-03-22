'use strict';
var express = require('express');


var _get = function(req, res){
    res.json({ message: 'Welcome to the coolest API on earth!' });
};

var router_list = [
    /*[method, path, middleware, callback]*/
    ['get'  , '/auth'  ,   null,   _get]
]

var routes = function(){
    var appRouter = express.Router();
    return {"appRouter": appRouter}
    return { "is_routes": true, "appRouter": appRouter}
};

module.exports = routes();