var app = angular.module("chatApp");

app.controller("entercontroller", function($scope, UserName, $location) {
  $scope.adduser = function(user) {
    UserName.adduser(user);
    $location.path('/chat').replace();
  }
})
