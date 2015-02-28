angular
  .module('app')
  .controller('FileController', ['$scope', '$state', 'File', function($scope,
      $state, File) {
    $scope.files = [];
		$scope.file = {};
	
    $scope.$on("LoadFile", function(eve, file) {
        //文件改变才刷新
        if(file.name!=$scope.file.name && file.path !=$scope.file.path )
            $scope.file = file;
            $scope.loadFileContent();
        });
      
    $scope.loadFileContent = function(){
        File.get({file: $scope.file})
        .$promise
        .then(function(results) {
            $scope.file.content = results.file.content;
        });
    };
    
      
    $scope.saveFileContent = function(){
    	File.put({file: $scope.file})
        .$promise
    	.then(function(results) {
            console.log(results);
          console.log('Save file successed!');
        });
    };
    
  }]);
