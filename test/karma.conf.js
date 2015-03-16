module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      //'client/vendor/**/*.js',
      //'app/lib/angular/angular-*.js',
      //'test/lib/angular/angular-mocks.js',
      //'client/js/**/*.js',
      //'client/module/**/*.js',
      //'server/**/*.js',*/
      'client/vendor/angular/angular.js',
      'client/vendor/angular-resource/angular-resource.js',
      'client/vendor/angular-sanitize/angular-sanitize.js',
      'client/vendor/angular-ui-router/release/angular-ui-router.js',
      'client/vendor/showdown/compressed/showdown.js',
      'client/vendor/showdown/compressed/extensions/prettify.min.js',
      'client/vendor/angular-markdown-directive/markdown.js',
      
      'test/lib/angular/angular-mocks.js',
      'client/js/*.js',
      'client/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'spec/**/*.js',
      'common/**/*',
      'content/**/*',
      'server/**/*.js'
      /*'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'*/
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
