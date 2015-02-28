(function() {
  'use strict';
  
  angular.module('app')
  .controller('treeCtrl', ['$scope','$rootScope', 'File',function($scope, $rootScope,File) {

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
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
    	var nodeData = scope.$modelValue;
        var file = {name:nodeData.title, title:nodeData.title, path:nodeData.path};
        
        //console.log(file);
        if(!file.isDirectory)$rootScope.$broadcast('LoadFile', file);
        //var fc_scope =  angular.element(fileView).scope();
        //if(!file.isDirectory)fc_scope.$emit('LoadFile', file);
	  };
      
    $scope.treeData = [];
    
    File.tree()
    .$promise
    .then(function(results) {
      	console.log(results.nodes);
    	$scope.treeData = results.nodes;
    });
    
  }]);

})();