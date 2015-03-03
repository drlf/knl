angular.module('vfApp', ['lbServices','ngSanitize', 'btford.markdown']);
angular.module('vfApp').
		config(['markdownConverterProvider', function (markdownConverterProvider) {
		  // options to be passed to Showdown
		  // see: https://github.com/coreyti/showdown#extensions
		  markdownConverterProvider.config({
			extensions: ['prettify']
		  });
		}])
    .controller('FileViewController', ['$scope', '$window', 'File', function ($scope, $window, File) {
    $scope.fileContent = 'fsdfsdfsd';

    var url = $window.location.href;
    var filePath = getPathFromUri(url);
    loadFile(filePath);
    
    //从服务器获取文件内容，放入$scope.fileContent
    function loadFile(filePath){
        //console.log();
        File.get({file: {path: filePath}})
        .$promise
        .then(function (results) {
            $scope.fileContent = results.file.content;
        });
    }
    
    //从跳转过来的URL中获取文件名，file=/fullpath
    function getPathFromUri(uri) {
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {}
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        return paraObj['file'];
    };

    
  }]);