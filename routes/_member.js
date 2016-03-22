'use strict';
var express = require("express");
var auth_middleware = require("./../lib/auth_middleware.js");
var routes_base = require("./../lib/routes_base.js");

var _post = function(req, res){
    res.send("Hello Post");
}

var _get = function(req, res){
    res.send("Hello Get");
}



var router_list = [
    /*[method, path, middleware, callback]*/
    ['post' , '/member'  ,   auth_middleware,   _post],
    ['get'  , '/member'  ,   auth_middleware,   _get]

]

var routes = new routes_base(router_list, express.Router());
module.exports = routes.routes();