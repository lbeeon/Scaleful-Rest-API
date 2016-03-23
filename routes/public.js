'use strict';
var express = require("express");
var jwt = require("jsonwebtoken");
var config = require('./../config.js');
var routes_base = require("./../lib/routes_base.js");
var sleep = require("sleep");

var _post = function(req, res){
    res.send("Hello Post");
}

var _get = function(req, res){
    console.log('-------sleep---------');
    sleep.sleep(0.1);
    res.send("Hello Get");
}

var _gettoken = function(req, res){
    var user = { "name": "Ben"};
    var token = jwt.sign(user, config.secret, {
      expiresInMinutes: 1 // expires in 24 hours
      //expiresInMinutes: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
}

var _posttoken = function(req, res){
    var user = { "name": "Ben"};
    var token = jwt.sign(user, config.secret, {
      expiresInMinutes: 1440 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
}



var router_list = [
    /*[method, path, middleware, callback]*/
    ['post' , '/user'  ,   null,   _post],
    ['get'  , '/user'  ,   null,   _get],
    ['post' , '/auth'  ,   null,   _posttoken],
    ['get'  , '/auth'  ,   null,   _gettoken],

]
var routes = new routes_base(router_list, express.Router());
module.exports = routes.routes();