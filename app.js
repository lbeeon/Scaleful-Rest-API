'use strict';
var cluster = require("cluster");
var fs = require('fs');
var routes = require('./routes/public.js');
var express = require("express");
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var logFile = fs.createWriteStream('./log.txt', {flag: 'a'});
var env = require('./lib/env.js');
var http = require("http");
var numCPUs = require("os").cpus().length;

var logger = require('./lib/logger.js').getInstance();
logger.trace('[trace]....');
logger.debug('[debug]....');
logger.info('[info]....');
logger.warn('[warn]....');
logger.error('[error]....');
logger.fatal('[fatal]....'); 


console.log(new env().get_env());
console.log("numCPUs\n", numCPUs);

if (cluster.isMaster) {
    console.log('Fork % worker from master:', numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('worker is running on %s pid', worker.process.pid);
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker with %s is closed', worker.process.pid);
    });
} else if (cluster.isWorker) {
    var port = process.env.PORT||8000;
    //var port = 8000;
    console.log('worker (%s) is now listening to http://localhost:%s', cluster.worker.process.pid, port);
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


    app.listen(port, function() {
      console.log('Magic on port: (%s)', port);
    });
}