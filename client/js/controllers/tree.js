(function() {
  'use strict';
  
  angular.module('app')
  .controller('treeCtrl', ['$scope','$rootScope', 'File',function($scope, $rootScope,File) {

    $scope.remove1 = function(scope, $event) {
        var nodeData = scope.$modelValue;
        //有子节点不能删除，暂时简单实现，后续添加递归删除。
        if(nodeData.nodes && nodeData.nodes.length>0){
            //对话框提示存在子节点，不能删除。
            return;
        };
        $event.stopPropagation();
        //console.log(nodeData);
        //先删除服务器上的文件，后移除页面上的节点。可以加上等待光标，表示正在进行费时操作。
        File.remove({file: nodeData})
        .$promise
        .then(function(results) {
            scope.remove();
        });
        
     
    };

    $scope.toggle = function(scope) {
        console.log('toggle');
      scope.toggle();
    };

    $scope.moveLastToTheBegginig = function () {
      var a = $scope.treeData.pop();
      $scope.treeData.splice(0,0, a);
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    };

    var getRootNodesScope = function() {
      return angular.element(document.getElementById("tree-root")).scope();
    };

    $scope.collapseAll = function() {
      var scope = getRootNodesScope();
      scope.collapseAll();
    };

    $scope.expandAll = function() {
      var scope = getRootNodesScope();
      scope.expandAll();
    };

    $scope.selectFile = function(scope) {
        //console.log('selectFile');
    	var file = scope.$modelValue;
        //var file = {name:nodeData.title, title:nodeData.title, path:nodeData.path, isDirectory:nodeData.isDirectory};
        
        //console.log(file);
        if(!file.isDirectory)$rootScope.$broadcast('LoadFile', file);
        //var fc_scope =  angular.element(fileView).scope();
        //if(!file.isDirectory)fc_scope.$emit('LoadFile', file);
	  };
      
    $scope.treeData = [];
    
    File.tree()
    .$promise
    .then(function(results) {
      	//console.log(results.nodes);
    	$scope.treeData = results.nodes;
    });
    
  }]);

})();