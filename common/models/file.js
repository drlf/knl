var raneto = require('raneto-core'),
    fs = require('fs'),
    marked = require('marked'),
    Q = require('q');

//file 自定义方法
module.exports = function(File) {
    var basePath = "content";
    
    function getRealPath(uriPath){
        var d = String.fromCharCode(uriPath);
        if(uriPath.indexOf('/') !=0 )return basePath + '/' + uriPath;
        return basePath + uriPath;
    }
    
    //获取目录树
    File.tree = function(cb) {
		cb(null,loadTreeSync('/'));
	}
	
    
    
    //获取目录列表
    File.list = function(path, cb) {
		cb(null,loadListSync(path));
	}
	
    //获取文件内容
    File.get = function(file, cb) {
        var path = getRealPath(file.path);
        var data = fs.readFile(path, function(err, data){
            if(err) {
                //console.error(err);
                cb(err);
            } else {
                //console.log(data);
            	if(file.type=='html'){
            		var content = raneto.processVars(data.toString('utf-8'));
            		var html = marked(content);
            		console.log('rento html....',html);
                    cb(null,{content: html,path: file.path, name: file.name});
            	}else{
            		cb(null,{content: data.toString('utf-8'),path: file.path, name: file.name});
            	}
            }
        });
    };
    
    var returnMsg = function(cb){
        var fn = function(err){
        if(err) {
                cb(err);
            } else {
                cb(null, "操作成功！");
            }
        }
        return fn;
    }
    
    //创建文件或文件夹，根据file的isDirectory来判断是否文件夹
    File.post = function( file, cb) {
        var content = file.content;
        var path = getRealPath(file.path);
        if(file.isDirectory){
            //创建目录
            //console.log('create folder: ', file);
            fs.mkdir(path,returnMsg( cb));
        }else{
            //创建文件
           //console.log('create file: ', file);
            //fs.writeFileSync(path,content);
            fs.writeFile(path,returnMsg( cb));
        }
        
    };
    
    //修改文件内容
    File.put = function( file, cb) {
        var content = file.content;
        var path = getRealPath(file.path);
        //ave(filename, data, cb);
        var data = fs.writeFile(path, content,function(err, resp){
            if(err) {
                //console.error(err);
                cb(err);
            } else {
                //console.log('file saved!');
                //console.log(resp);
                cb(null,'File saved!');
            }
        });
        
    };
     
    //删除文件
    File.delete = function(file, cb){
        //console.log(file);
        //var path = file.path;
        deleteFile(file, cb);
    }
    
    //重命名文件
    File.rename = function(file, newName, cb){
        var oldPath = file.path;
        //TODO 利用oldPath获得目录，与newName组装成新文件名，要求判断是否.md结尾
        var newPath = getParentPath(file.path) +'/' + newName;
         renameFile(oldPath, newPath, cb);
    }
    
    File.remoteMethod(
            'tree', 
            {
              http: {path: '/tree', verb: 'get'},
              returns: {arg: 'nodes', type: 'array'}
            }
        );
    
    File.remoteMethod(
            'list', 
            {
             accepts: {arg: 'path', type: 'string'},
              http: {path: '/list', verb: 'get'},
              returns: {arg: 'nodes', type: 'array'}
            }
        );
    
    File.remoteMethod(
        'get', 
        {
            accepts: {arg: 'file', type: 'object'},
          http: {path: '/', verb: 'get'},
          returns: {arg: 'file', type: 'object'}
        }
    );
    
    File.remoteMethod(
        'post', 
        {
          accepts: {arg: 'file', type: 'object'},
          http: {path: '/', verb: 'post'},
          returns: {arg: 'message', type: 'string'}
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
    
    File.remoteMethod(
        'delete', 
        {
          accepts: {arg: 'file', type: 'object'},
          http: {path: '/', verb: 'delete'},
          returns: {arg: 'message', type: 'string'}
        }
    );
    
    File.remoteMethod(
        'rename', 
        {
            accepts: [
               {arg: 'file', type: 'object'},
               {arg: 'newName', type: 'string'}
            ],
          returns: {arg: 'message', type: 'string'}
        }
    );
    
    //file的附加属性 参考http://nodejs.cn/api/fs/#fs_class_fs_stats
    var applyFile = function(file, fileStat){
        file.birthtime = fileStat.birthtime;   //文件创建时间
        file.mtime = fileStat.mtime; //最后修改时间
        file.atime = fileStat.atime;   //最后访问时间
        file.isDirectory = fileStat.isDirectory();
        file.size = fileStat.size;
        return file;
    };
    
    //同步遍历目录树，生成treeNode对象
    //TODO 实现异步遍历方法，回调函数不清楚怎么写，用promise实现是否更容易些。
    var loadTreeSync = function(uriPath){
        var fileList = [];
        var path = getRealPath(uriPath);
        var dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            var newPath = uriPath + '/' + item;
            var fileStat = fs.statSync(getRealPath(newPath));
            var file = {name:item, title:item, path: newPath};
            applyFile(file, fileStat);
            if(fileStat.isDirectory()){
                var nodes = loadTreeSync(newPath);
                //fileList.push({title:item, path: newPath, nodes:nodes});
                file.nodes = nodes;
            }
            fileList.push(file);
        });
        //console.log(fileList);
        return fileList;
    }
    
    //同步生成uriPath目录下的文件列表，返回file数组
    var loadListSync = function(uriPath){
        var fileList = [];
        var path = getRealPath(uriPath);
        //console.log('loadListSync: '+path);
        var dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            var newPath = uriPath + '/' + item;
            var fileStat = fs.statSync(getRealPath(newPath));
            var file = {name:item, title:item, path: newPath};
            applyFile(file, fileStat);
            fileList.push(file);
        });
        //console.log(fileList);
        return fileList;
    }
    
    var deleteFile = function(file, cb){
        var path = getRealPath(file.path);
        //console.log('delete file....', path);
        var fn = function(err){
            if(err) {
                cb(err);
            } else {
                cb(null, "删除成功");
            }
        };
        if(file.isDirectory)fs.rmdir(path, fn);
        else fs.unlink(path, fn);
    }
    
    var renameFile = function(oldPath, newPath, cb){
        var _oldPath = getRealPath(oldPath);
        var _newPath = getRealPath(newPath);
        fs.rename(_oldPath, _newPath, function(err){
            if(err) {
                cb(err);
            } else {
                cb(null,"重命名成功.");
            }
        });
    }
    
    //获得父目录
    function getParentPath(path){
        if(path == '/')return '/';
        var index = path.lastIndexOf('/');
        if(index<=0)return '/'
         return path.substr(0, index);;
    }
    /*read = function(path,cb){
        fs.readFile(path,function(err,data,cb){
            if(err) throw err;
            cb(null,{content: data.toString('utf-8'),path: path, name: path});
        });
    }*/
    // TODO 改为异步读取文件。 如上修改后，造成cb丢失，实际上在fs.readFile(path,function(err,data,cb){  处，cb还有值，但是执行完readfile后，cb为undefined。 可能是read先执行完后返回了，异步再执行结束时，原有调用环境已经不存在了。改为promise就好了。
    /*read = function(path,cb){
        var data = fs.readFileSync(path);
        cb(null,{content: data.toString('utf-8'),path: path, name: path});
    };*/
    //参考https://github.com/MajorBreakfast/walk-tree-as-promised ，但是似乎使用了同步方法
    /*var loadTree = function(path, recursive, cb){
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
    }*/
    
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
    
    /*save = function(path, content, cb){
        var data = fs.writeFileSync(path, content);
        cb(null,'File saved!');
    };*/
};
