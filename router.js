'use strict';
var express = require('express');

var router = function(){
    var appRouter = express.Router();

    var Middleware = function(req, res, next){
        console.log("token");
        console.log("user");

        next();
    }

    return appRouter;
}

module.exports = router;