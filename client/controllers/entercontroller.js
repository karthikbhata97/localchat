var app = angular.module("chatApp");

app.controller("entercontroller", function($scope, $resource, UserName, $location, socket) {
  $scope.userlist = []
  var Users = $resource('/api/getuserlist');
  Users.query(function(result) {
    $scope.userlist = result;
  })

  socket.on("new_user", function(data) {
    $scope.userlist.push(data.username);
  })

  $scope.adduser = function(user) {
    if($scope.userlist.indexOf(user)!=-1) {
      alert("Sorry!! Username already taken.")
    }
    else {
      socket.emit("add_user", {"username": user});
      UserName.adduser(user);
      $location.path('/chat').replace();
    }
  }
})
