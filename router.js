var Profile = require('./profile');
var renderer = require('./renderer');
var queryString = require('querystring');

var commonHeader = {"Content-Type":'text/html'};

function home(req,res){
  if(req.url === '/' && req.method.toLowerCase() === 'get'){
    res.writeHead(200,commonHeader);
    renderer.view('header',{},res);
    renderer.view('search',{},res);
    renderer.view('footer',{},res);
    res.end();
  }else{
    req.on('data',function(postBody){
      var query = queryString.parse(postBody.toString());
      res.writeHead(302,{'Location': '/'+query.username});
      res.end();
    })
  }
}

function user(req,res){
  var username = req.url.replace("/","");
  if(username.length > 0){
    res.writeHead(200,commonHeader);
    renderer.view('header',{},res);

    var studentProfile = new Profile(username);

    studentProfile.on('end',function(profileJSON){
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
    renderer.view('profile',values,res);
    renderer.view('footer',{},res);
    res.end();
   });

   studentProfile.on('error',function(error){
     var error = {errorMessage: error.message};
     renderer.view('error',error,res);
     renderer.view('footer',{},res);
     res.end();
   });
 }
}

module.exports.home = home;
module.exports.user = user;
