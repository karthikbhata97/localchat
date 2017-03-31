var app = angular.module("chatApp", ['ngRoute']);

app.factory('socket', function($rootScope) {
  var socket = io.connect();
  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
});

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/views/enter.html',
    controller: 'entercontroller'
  })
  .when('/chat', {
/*    resolve: {
      "check": function(UserName, $location) {
        if(!UserName.getuser()) {
          $location.path('/').replace();
        }
      }
    },*/
    templateUrl: '/views/chat.html',
    controller: 'chatcontroller'
  })
  .otherwise({
    redirectTo: '/'
  })
})

app.factory('UserName', function() {
  var user = {
    username: null
  }
  return {
    adduser: function(val) {
      user.username = val;
    },
    getuser: function() {
      return user.username;
    }
  }
})

app.controller("mainController", function($scope) {
  $scope.user = "Hello";
});
