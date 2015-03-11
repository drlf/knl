'use strict';

/* jasmine specs for controllers go here */

describe('vfApp测试', function(){
  //beforeEach(module('app.FileController'));
	beforeEach(module('vfApp'));

  it('should ....', function($controller) {
	  var ctrl = $controller('FileViewController');
      expect(ctrl).toBeDefined();
      console.log(typeof ctrl.loadFile);
  });

  it('should ....', inject(function() {
    //spec body
  }));
});

describe('mvNewApp测试', function(){
		beforeEach(module('mvNewApp'));
		
	  it('should ....', function($controller) {
		  var scope;
		  //scope = $rootScope.$new();
		  var ctrl = $controller('FileListController', {$scope: scope});
	      expect(ctrl).toBeDefined();
	      expect(typeof ctrl.loadFile).toEqual('function');
	      expect(scope.rootPath).toEqual('/');
	      //console.log(typeof ctrl.loadFile);
	  });

	});
