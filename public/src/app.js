'use strict';

angular.module('cali.help.admin', ['ui.router', 'elasticsearch', 'hc.marked'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('newFunction', {
      url: "/fn",
      templateUrl: "views/input.html",
      controller: 'EditFunctionController as ctrl'
    })
    .state('editFunction', {
        url: '/fn/:id',
        templateUrl: "views/input.html",
        controller: 'EditFunctionController as ctrl'
    })
    ;
});
