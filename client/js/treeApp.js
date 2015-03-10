angular
  .module('treeApp', [
    'lbServices'
  ]);
angular.module('treeApp').controller('treeController', ['$scope', 'File', function ($scope, File) {
	$scope.loadFileContent = function(){
		console.log('loading....');
	};
	
	$scope.saveFileContent = function(){
		//console.log(editor.getElementById('fileViewTextarea').value);
		console.log($scope.fileContent);
	};
	
	$scope.fileContent = "111fsdfklsdjfklsjfklsdjkl";
	var editor = initEdit();
	
	function initEdit(){
		var opts = {
				  container: 'fileView',
				  textarea: fileViewTextarea,
				  basePath: 'vendor/epiceditor/epiceditor/',
				  clientSideStorage: true,
				  localStorageName: 'epiceditor',
				  useNativeFullscreen: true,
				  parser: marked,
				  /*file: {
				    name: 'epiceditor',
				    defaultContent: '',
				    autoSave: 100
				  },*/
				  theme: {
				    base: '/themes/base/epiceditor.css',
				    preview: '/themes/preview/preview-dark.css',
				    editor: '/themes/editor/epic-dark.css'
				  },
				  button: {
				    preview: true,
				    fullscreen: true,
				    bar: "auto"
				  },
				  focusOnLoad: false,
				  shortcut: {
				    modifier: 18,
				    fullscreen: 70,
				    preview: 80
				  },
				  string: {
				    togglePreview: 'Toggle Preview Mode',
				    toggleEdit: 'Toggle Edit Mode',
				    toggleFullscreen: 'Enter Fullscreen'
				  },
				  autogrow: false
				}
				var editor = new EpicEditor(opts).load();
			return editor;
	}
	
	
}]);
  
  /*.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/file.html',
        controller: 'FileController'
      });

    $urlRouterProvider.otherwise('todo');
  }]);*/
