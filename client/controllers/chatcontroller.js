var app = angular.module("chatApp");

app.controller("chatcontroller", function($scope, socket, UserName, $location) {
  $scope.message = [];
  $scope.waitmsg = null;
  $scope.user = UserName.getuser();
  $scope.send = function(message) {
    $scope.message.push("You: " + message);
    socket.emit('new_message', {"message": message, "user": $scope.user});
    $scope.msg=null;
    $scope.waitmsg = "Waiting for the reply...";
  }

  socket.on('reply', function(data) {
    $scope.$apply(function() {
      if(data.user==$scope.user) {
        $scope.waitmsg = null
        $scope.message.push("Bot: " + data.data);
      }
    })
  });

  $scope.clear = function() {
    $scope.message = []
  }

  $scope.close = function() {
    UserName.adduser(null);
    $location.path('/').replace();
  }

});
