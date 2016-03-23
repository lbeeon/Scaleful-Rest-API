# Scaleful-Rest-API

##Target
1. Scalable restful api with well extensive framework.
2. Support log server.
3. Support authentication with json web token.

##Usage
### Add new route
1. Create new file in "routes" folder.
2. Use following code as example.
  ```Javascript
  'use strict'
  var express = require("express");
  var routes_base = require("../lib/routes_base.js"); //required
  
  // Your code start here.
  
  var _post = function(req, res) {
      res.send("new routes post!");
  }
  
  var _get = function(req, res) {
      res.send("new routes get!");
  }
  
  // Add to router list.
  // [method, path, middleware, callback]
  
  var router_list = [
      ['post', '/newapi', null, _post],
      ['get', '/newapi', null, _get]
  ]

  var routes = new routes_base(router_list, express.Router());
  module.exports = routes.routes();
```
3. Done!
