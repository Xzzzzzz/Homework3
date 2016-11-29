var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function() {
  $http.get('/resume').success(function(response) {
    var length = Object.keys(response).length;
    console.log(length);
    var education =[], skill = [];
    var project = [];
    for(var i=0;i<length;i++)
    {
      if(response[i].type === 'edu'){
        education.push(response[i]);
       $scope.education = education;
      }
      if(response[i].type === 'project'){
        project.push(response[i]);
       $scope.project = project;
      }
      else if(response[i].type === 'skill'){
        skill.push(response[i]);
       $scope.skill = skill;
      }
     
    }
  });
};



refresh();

$scope.addSchool = function() {
  console.log($scope.edu.toSource());
  $scope.edu.type = 'edu';
  $http.post('/addSchool', $scope.edu).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/resume/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/resume/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/resume/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿