// Generated by CoffeeScript 1.7.1
angular.module('listxModule', []).value('listxConfig', {
  template: 'module/angular-list-x/tpl/list-tpl.html',
  searchBarTemplate: 'module/angular-list-x/tpl/search-bar-tpl.html',
  itemsTemplate: 'module/angular-list-x/tpl/items-tpl.html',
  itemTemplate: 'module/angular-list-x/tpl/item-tpl.html'
}).controller('listxController', function($scope, $element, $attrs, $transclude, $templateCache, listxConfig) {
  $scope.searchBarTemplate = listxConfig.searchBarTemplate;
  $scope.itemsTemplate = listxConfig.itemsTemplate;
  $scope.itemTemplate = listxConfig.itemTemplate;
  $scope.itemTpl = false;
  $scope.q = {
    val: ''
  };
  $scope.clickTitle = function(item) {
    $scope.onTitleClick();
  };
    
  $scope.isSelected = function(item) {
    if (item.selected) {
      return 'active';
    }
  };
  $scope.overItem = function(item) {
    return $scope.onMouseOver({
      item: item
    });
  };
  $scope.leaveItem = function(item) {
    return $scope.onMouseLeave({
      item: item
    });
  };
  $scope.selectItem = function(item) {
      //console.log('select Item');
    var curItem, _i, _len, _ref;
    _ref = $scope.ngModel;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      curItem = _ref[_i];
      if (curItem.selected) {
        delete curItem.selected;
      }
    }
    item.selected = true;
    return $scope.onSelect({
      item: item
    });
  };
  this.setItemTemplate = function(tpl, src) {
    $scope.itemTpl = true;
    if (src) {
      $scope.itemTemplate = src;
    }
    return $templateCache.put('listxItemTpl', tpl);
  };
  return null;
}).directive('listX', [
  '$http', '$templateCache', 'listxConfig', function($http, $templateCache, listxConfig) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      require: 'ngModel',
      scope: {
        title: '@',
        hideSearchBar: '@',
        itemHandlers: '&',
        loadUrl: '@',
        ngModel: '=',
		fileContent : '=',
        onSelect: '&',
        onLoad: '&',
        onTitleClick: '&',
        onMouseOver: '&',
        onMouseLeave: '&'
      },
      templateUrl: function(tElement, tAttrs) {
        return listxConfig.template;
      },
      controller: 'listxController',
      link: function(scope, iElement, iAttrs, controller) {
          
          function reload(){
              if(scope.ngModel){
                  //scope.ngModel = scope.fileContent;
                  return scope.onLoad();
              }
              else{
                  $('.list-x-main div[ng-transclude]').remove();
                    return $('.list-x-main').removeAttr('title');
              }
          }
          reload();
      }
    };
  }
]);

//# sourceMappingURL=angular.listx.map
