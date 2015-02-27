angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ui.pagedown',
    'ui.tree'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('todo', {
        url: '',
        templateUrl: 'views/file.html',
        controller: 'FileController'
      });

    $urlRouterProvider.otherwise('todo');
  }]);
