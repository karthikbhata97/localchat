var app = angular.module("chatApp");

app.controller("chatcontroller", function($scope, socket, UserName, $location) {
  $scope.message = [];
  $scope.waitmsg = null;
  $scope.user = UserName.getuser();
  $scope.send = function(message) {
    socket.emit('new_message', {"message": message, "user": $scope.user});
    $scope.msg=null;
  }

  socket.on('reply', function(data) {
    $scope.$apply(function() {
      $scope.message.push(data.user + ": " + data.data);
    })
  });

  $scope.clear = function() {
    $scope.message = []
  }

  $scope.close = function() {
    socket.emit('logout_user', {username: $scope.user});
    UserName.adduser(null);
    $location.path('/').replace();
  }

  socket.on("logout", function(data){
    $scope.$apply(function() {
      $scope.userlist.splice($scope.userlist.indexOf(data.username), 1);
    })
  })

});
