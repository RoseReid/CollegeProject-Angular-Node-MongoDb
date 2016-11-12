(function(angular) {
  'use strict';
angular.module('employees', []) //Sq brackets creates a new instance of cars to put more data in it

  .component('employees', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'EmployeeList',   component: 'employeeList', useAsDefault: true},
      {path: '/addEmployee', name: 'AddEmployee', component: 'employeeDetail'},
      {path: '/:id', name: 'EmployeeDetail', component: 'employeeDetail'}
    ]
  })

  
})(window.angular);

