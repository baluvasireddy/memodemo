var app = angular.module('memoApp', ['ngRoute']);
app.controller('memoController', function($scope) {
    $scope.heading = "Hello World";
    $scope.fun = function() {
        return "Memo Demo";
    };
}).controller('addController', function($scope) {
	alert('');
    $scope.heading = "addController";
    $scope.addMemo = function() {
        alert('addMemo')
    };
})
.controller('menuController', function($scope) {
    $scope.heading = "menuController";
    $scope.menuAction = function() {
        alert('menuAction')
    };
});