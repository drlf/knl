var raneto = require('raneto-core'),
    fs = require('fs'),
    Q = require('q');

module.exports = function(File) {
    /*File.get = function(cb) {
     //var page = raneto.getPage('README.md');
      //cb(null, page);
        read('README.md').then(function(result){
          cb(null,{content: result.toString('utf-8'),path: path, name: path});
            
        },function(error){
          console.log("invoke in deferd".red);
          console.log(error.toString().red);
            cb(null,null);
        });
    };*/
    File.get = function(file, cb) {
        var path = file.name;
        var data = fs.readFile(path, function(err, data){
            if(err) {
                console.error(err);
                cb(err);
            } else {
                //console.log(data);
                cb(null,{content: data.toString('utf-8'),path: path, name: path});
            }
        });
    };
    
    File.put = function( file, cb) {
        var data = file.content;
        var path = file.name;
        //ave(filename, data, cb);
        var data = fs.writeFile(path, content,function(err, resp){
            if(err) {
                console.error(err);
                cb(err);
            } else {
                console.log('file saved!');
                console.log(resp);
                cb(null,'File saved!');
            }
        });
        
    };
     
    File.remoteMethod(
        'get', 
        {
            accepts: {arg: 'file', type: 'object'},
          http: {path: '/', verb: 'get'},
          returns: {arg: 'file', type: 'object'}
        }
    );
    
    File.remoteMethod(
        'put', 
        {
          accepts: {arg: 'file', type: 'object'},
          http: {path: '/', verb: 'put'},
          returns: {arg: 'message', type: 'string'}
        }
    );
    
    
    /*read = function(path,cb){
        fs.readFile(path,function(err,data,cb){
            if(err) throw err;
            cb(null,{content: data.toString('utf-8'),path: path, name: path});
        });
    }*/
    // TODO 改为异步读取文件。 如上修改后，造成cb丢失，实际上在fs.readFile(path,function(err,data,cb){  处，cb还有值，但是执行完readfile后，cb为undefined。 可能是read先执行完后返回了，异步再执行结束时，原有调用环境已经不存在了。改为promise就好了。
    read = function(path,cb){
        var data = fs.readFileSync(path);
        cb(null,{content: data.toString('utf-8'),path: path, name: path});
    };
    
    loadTree = function(path, recursive){
    	var localPaht = path;
    	var data = [];
    	//读取目录下所有文件，过滤器为后缀名.md或为目录
    	var files = fs.readdirSync(path);
    	for(file in files){
    		console.log(file);
    	}
    	//如果是递归
    	if(recursive){
    		for(file in data){
    			if(file.isDirectory){
    				var newPath = localPaht + '/' +file;
    				file.nodes = loadTree(newPath, recursive);
    			}
    		}
    	};
    	return data;
    }
    
    /*read = function(path){
        var deferred = Q.defer();
        fs.readFile(path,function(error,result){
          if(error){
            deferred.reject(error.toString().red);
          }
          deferred.resolve(result);
        });
        return deferred.promise;
    };*/
    
    save = function(path, content, cb){
        var data = fs.writeFileSync(path, content);
        cb(null,'File saved!');
    };
};
