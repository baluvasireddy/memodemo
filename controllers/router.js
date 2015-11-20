app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/#', {
        templateUrl: 'templates/menu.html',
        controller: 'menuController'
      }).
      when('/add', {
        templateUrl: 'templates/add.html',
        controller: 'addController'
      }).
      otherwise({
        redirectTo: '/menu'
      });
}]);