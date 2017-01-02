var fs = require('fs');

function merge(values, fileContents){
  for(var key in values){
    fileContents = fileContents.replace("{{"+key+"}}",values[key]);
  }
  return fileContents;
}

function view(templateName, values, response){
  var fileContents = fs.readFileSync('./views/'+templateName+'.html',{encoding: "utf-8"});
  fileContents = merge(values,fileContents);
  response.write(fileContents);
}

module.exports.view = view;
