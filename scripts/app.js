const app = angular.module("myapp", []);

app.controller("documentController", function($scope) {
  $scope.demoDate = new Date().toLocaleDateString();
});
