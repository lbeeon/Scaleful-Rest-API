'use strict';
var fs = require('fs');
var routes = require('./routes/public.js');
var express = require("express");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var logFile = fs.createWriteStream('./log.txt', {flag: 'a'});
var env = require('./lib/env.js');

var logger = require('./lib/logger.js').getInstance();
logger.trace('[trace]....');
logger.debug('[debug]....');
logger.info('[info]....');
logger.warn('[warn]....');
logger.error('[error]....');
logger.fatal('[fatal]....'); 


console.log(new env().get_env());

var app = express();
var router_index = Array();

var path = "./routes";
var module_list = fs.readdir(path, function(err, data){
    data.forEach(function(route_path){
        var appRouter = require(path + "/" + route_path);
        if (appRouter.is_routes){
            app.use('/', appRouter.appRouter);
            if (router_index.filter(function(n){  return appRouter.path_list.indexOf(n) > -1;}).length > 0){
            	throw Error('Router path was registered!!');
            }
            router_index = router_index.concat(appRouter.path_list);
        }else{
            console.log(route_path);
        }
    });
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan({stream:logFile}));


app.listen(3000, function() {
  console.log('Magic on port: 3000');
});
