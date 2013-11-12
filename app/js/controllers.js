'use strict';

angular.module('myApp.controllers', [])
  .controller('ListCtrl', ['$scope', 'UserService',
    function($scope, UserService) {

      $scope.users = UserService.query();

      $scope.clear = function() {
        UserService.clear();
      };

    }
  ])
  .controller('EditCtrl', ['$scope', '$location', 'UserService', '$routeParams',
    function($scope, $location, UserService, $routeParams) {

      var id = $routeParams.id;

      if (id) {
        $scope.user = UserService.get({id: id});
      } else {
        $scope.user = new UserService();
      }

      $scope.save = function (){
        $scope.user.$save(function(){
          $location.path('/');
        });
      };

      $scope.delete= function() {
        $scope.user.$delete(function(){
          $location.path('/');
        });
      };
    }
  ]);
