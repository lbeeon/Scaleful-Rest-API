'use strict';
var os = require('os');

var env = (function () {
    function env() {
    }
    env.prototype.get_env = function () {
		console.log(os.hostname());
		return "local";
    };
    return env;
}());

module.exports = env;