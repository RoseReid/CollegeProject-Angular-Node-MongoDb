//this is so that the scope does not get polluted
//this code has the correct instance of Angular
(function(angular) {
  'use strict';
angular.module('app', ['ngComponentRouter', 'cars', 'customers', 'employees'])
// angular.module('app', ['ngComponentRouter', 'customers'])
// angular.module('app', ['ngComponentRouter', 'employees'])


.config(function($locationProvider) {
  // $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'app')

.component('app', {
templateUrl: '/javascripts/components/navbar.html',


  $routeConfig: [
    {path: '/cars/...', name: 'Cars', component: 'cars', useAsDefault: true},
    {path: '/customers/...', name: 'Customers', component: 'customers' },
    {path: '/employees/...', name: 'Employees', component: 'employees' }

  ]
});
})(window.angular);

