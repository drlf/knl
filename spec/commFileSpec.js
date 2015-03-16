/**
 * New node file
 */
describe('File operations', function(){
	var File = {};
	File.remoteMethod = function(){};
	require('../common/models/file.js')(File);
	
	describe("File.tree", function() {
		  it("return tree ", function() {
			  File.tree(function(err,result){
		    	//console.log(result);
				  expect(result.length).toBe(2);
				  expect(result[0].name).toEqual('lv1'); 
		    })
		  });
		});
  
	describe("File.list", function() {
		  it("return list ", function() {
			  File.list("/", function(err,result){
		    	//console.log(result);
				  if(err)throw new ERROR(err);
				  expect(result.length).toBe(2);
				  expect(result[0].name).toEqual('lv1');
		    })
		  });
		});
});
