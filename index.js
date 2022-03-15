var http = require("http");
var fs = require("fs");
var formidable = require("formidable");

var uploadFileForm = fs.readFileSync("form.html");
var path = "";
var filename = "";

http.createServer(function(request, response){
  if(request.url == "/uploaded"){
    var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
            path = files.filetoupload.filepath;
            filename = files.filetoupload.filename;
            console.log(path);
            var fileContents = fs.readFileSync(path);
            response.writeHead(200);
            response.write("<html><form method='post' action='/download'><textarea id='editor' name='editfile' rows='4' cols='50'>"+fileContents+"</textarea><br><br><input type='submit' value='Submit'></form></html>");
            response.end();
        });
  }else if(request.url == "/"){
    response.writeHead(200);
    response.write(uploadFileForm);
    response.end();
  }else if(request.url ==  "/download"){
    var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
          console.log(fields.editfile);
          fs.writeFile(path,fields.editfile, (error)=>{});
          response.setHeader('Content-disposition', 'attachment; filename='+path);
          response.end(fields.editfile);
        });
  }
}).listen(8081);

console.log("server running 200");