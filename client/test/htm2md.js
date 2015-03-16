var html2markdown = require('html2markdown'),
	http = require("http"),
	fs = require('fs');

//console.log(html2markdown('<h1>Hello markdown!</h1>'));

//获取Url网页的内容，convert后保存为filePath指向的文件
//TODO 自动命名文件，随机文件名
var url = "http://1.wdlf.sinaapp.com/?page_id=35"; 
	//"http://marketplace.eclipse.org/content/enide-studio-2014-nodejs-javascript-and-java";
var filePath = "test.md";

url2Md(url, filePath);
//testConvert();
function url2Md(url, filePath){
	 http.get(url, function(res) {
	    var data = "";
	    res.on('data', function (chunk) {
	      data += chunk;
	    });
	    res.on("end", function() {
	    	convertAndSave(data, filePath);
	    });
	  }).on("error", function(err) {
	    //callback(null);
		  console.log(err);
	  });
}

function convertAndSave(data, filePath){
	//var content = html2markdown(data);
	var content = html2markdown(data)
	console.log(content);
	fs.writeFileSync(filePath, content);
	
}

function testConvert(){
	var content = html2markdown('<h1>Hello markdown!</h1>')
	fs.writeFileSync(filePath, content);
	
}

