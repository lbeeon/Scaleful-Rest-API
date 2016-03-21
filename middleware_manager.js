var fs = require('fs');

function load_all_router() {
    var path = "./routes";
    var module_list = fs.readdir(path, function(err, data){
        data.forEach(function(route_path){
            var appRouter = require(path+"/"+ route_path);
            

        });
        console.log(data);
    });
}

module.exports = load_all_router;