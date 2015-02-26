angular
  .module('app')
  .controller('FileController', ['$scope', '$state', 'File', function($scope,
      $state, File) {
    $scope.files = [];
		$scope.file = {name:'README.md',path:'README.md',content:''};
	
    $scope.getFileContent = function(){
    	/*File.get()
    	.then(function(results) {
            console.log(results);
          $scope.file = results;
        });*/
        /*var ret = File.get();
        console.log(ret);*/
        $scope.file = {name:$scope.file.name};
        File.get({file: $scope.file})
        .$promise
        .then(function(results) {
            //console.log(results.file.content);
            $scope.file = results.file;
        });
    };
    
      
    $scope.saveFile = function(){
        //console.log($scope.file.content);
    	File.put({file: $scope.file})
        .$promise
    	.then(function(results) {
          //$scope.file = results;
            console.log(results);
          console.log('Save file successed!');
        });
    };
    
  }]);
