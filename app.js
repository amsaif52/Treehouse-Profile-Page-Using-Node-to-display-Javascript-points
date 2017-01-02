var http = require('http');
var router = require('./router');

var port = 3000;
var localhost = '127.0.0.1';

http.createServer(function(req,res){
  router.home(req,res);
  router.user(req,res);
}).listen(port,localhost,function(){
  console.log("Listening to %s: %s",localhost,port);
});
