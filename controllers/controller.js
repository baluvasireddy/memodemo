var app = angular.module('memoApp', ['ngRoute']);
app.controller('memoController', function($scope) {
    $scope.heading = "Hello World";
    $scope.fun = function() {
        return "Memo Demo";
    };
});