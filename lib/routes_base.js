'use strict';
var express = require("express");

var routes_base = (function () {
    function routes_base(router_list, appRouter) {
        this.router_list = router_list;
        this.router = appRouter;
        this.path = Array();
    }
    routes_base.prototype.appRouter = function () {
        var appRouter = this.router;
        for (var i = 0, len = this.router_list.length; i < len; i++) {
            var elem = this.router_list[i];
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
            this.path.push([elem[0],elem[1]].join(":"));
        }
        return appRouter;
    };
    routes_base.prototype.routes = function () {
        return { "is_routes": true, "appRouter": this.appRouter(), "path_list": this.path };
    };
    return routes_base;
}());

module.exports = routes_base;