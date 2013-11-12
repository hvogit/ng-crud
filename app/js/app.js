'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListCtrl'
  })
  .when('/edit/:id', {
    templateUrl: 'partials/edit.html',
    controller: 'EditCtrl'
  })
  .when('/new', {
    templateUrl: 'partials/edit.html',
    controller: 'EditCtrl'
  })
  .otherwise({
    redirectTo: '/list'
  });
}]);

