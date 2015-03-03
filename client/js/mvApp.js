angular.module('mvApp', ['listxModule', 'lbServices']);
angular.module('mvApp').controller('FileListController', ['$scope','$window', 'File', function ($scope,$window, File) {
    $scope.fileList = [];
    
    var listHistory = []
    
    //设置文件目录列表显示内容
    var setFileList = function(list){
        if($scope.fileList)listHistory.push($scope.fileList);
        $scope.fileList = list;
    }
    
    //选中文件，触发该事件
    $scope.selectFile = function (item) {
        //是目录，则进入下级目录
        if(item.isDirectory && item.nodes){
            setFileList(item.nodes);
        }
        //如果是文件，跳转到文件阅读页面
        if(!item.isDirectory){
            //console.log('reading file...', item.title);
            $window.location.href = 'vf.html?file='+item.path;
        }
    };
    
    //回到上一级目录
    $scope.goBack = function(){
        var list = listHistory.pop();
        if(list&&list.length<1)return;
        //console.log(list);
        if(list)$scope.fileList = list;
    }

    File.tree()
        .$promise
        .then(function (results) {
            setFileList(results.nodes);
        });

  }]);