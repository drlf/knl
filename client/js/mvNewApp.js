angular.module('mvApp', ['lbServices']);
angular.module('mvApp').controller('FileListController', ['$scope', '$window', 'File', function ($scope, $window, File) {
    $scope.fileList = [];
    $scope.rootPath = $scope.curPath = "/";
    
    //设置文件目录列表显示内容
    var getFileList = function ( path ){
        File.list({path: path})
        .$promise
        .then(function (results) {
            $scope.fileList = results.nodes;
            $scope.curPath = path;
            //console.log('curpath:', $scope.curPath);
        });
        
    }
    
    //选中文件，触发该事件
    $scope.selectFile = function (item) {
        //console.log(item.path);
        //是目录，则进入下级目录
        if(item.isDirectory){
            getFileList(item.path);
            return;
        }
        //如果是文件，跳转到文件阅读页面
        if(!item.isDirectory){
            //console.log('reading file...', item.title);
            $window.location.href = 'vf.html?file='+item.path;
        }
    };
    
    //回到上一级目录
    $scope.goBack = function(){
        //console.log($scope.curPath);
        var path = getParentPath($scope.curPath);
        getFileList(path);
    }
    
    //删除文件或目录，删除后重新加载当前目录列表
    $scope.deleteFile = function(file){
        //console.log('delete File: ', file);
        File.delete({file: file})
        .$promise
        .then(function (results) {
            getFileList($scope.curPath);
        });
        
    }
    
    //新建文件，成功后重新加载当前目录列表
    $scope.newFile = function(){
        createNewFile(false);
        //console.log('delete File: ', file);
        /*File.delete({file: file})
        .$promise
        .then(function (results) {
            getFileList($scope.curPath);
        });*/
        
    }
    
    //新建文件夹，成功后重新加载当前目录列表
    $scope.newFolder = function(){
        createNewFile(true);
    }
    
    $scope.renameFile= function(file){
        var name=prompt("请输入文件名","");
        if(name==null || typeof name === 'undefined')return;
        name = name.trim();
        if(name.length<1)return;
        if(!file.isDirectory && !endwith(name.toLowerCase(), '.md'))name = name + '.md';
        File.rename({file: file,newName: name})
        .$promise
        .then(function (results) {
            getFileList($scope.curPath);
        });
    }
    
    function createNewFile(isDirectory){
        var name=prompt("请输入文件名","");
        /*console.log(name);
        console.log(typeof name);*/
        if(name==null || typeof name === 'undefined')return;
        name = name.trim();
        if(name.length<1)return;
        if(!isDirectory && !endwith(name.toLowerCase(), '.md'))name = name + '.md';
        var file = {
            name : name,
            path : $scope.curPath + '/' + name,
            isDirectory: isDirectory
        };
        File.post({file: file})
        .$promise
        .then(function (results) {
            getFileList($scope.curPath);
        });
    }
    
    function endwith(str, regStr){
       var reg=new RegExp(regStr+"$");     
      return reg.test(str);        
    }
    
    function getParentPath(path){
        if(path == '/')return '/';
        var index = path.lastIndexOf('/');
        if(index<=0)return '/'
         return path.substr(0, index);;
    }
    
    getFileList($scope.rootPath);
    

  }]);