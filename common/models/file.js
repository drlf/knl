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
        var filename = file.name;
        read(filename, cb);
    };
    
    File.put = function( file, cb) {
        var data = file.content;
        var filename = file.name;
        save(filename, data, cb);
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
