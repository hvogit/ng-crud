'use strict';

/* Services */

angular.module('myApp.services', [])
  .value('version', '0.1')
  .factory('UserService', ['$resource', function($resource) {
    return $resource('/users/:id', { id: '@id'},
      { // additional actions
        clear: { method: 'DELETE', params: {id: 'ALL'} }
      }
    );
  }]);








