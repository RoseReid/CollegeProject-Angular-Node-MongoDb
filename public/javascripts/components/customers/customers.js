(function(angular) {
  'use strict';
angular.module('customers', []) //Sq brackets creates a new instance of cars to put more data in it

  .component('customers', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'CustomerList',   component: 'customerList', useAsDefault: true},
      {path: '/addCustomer', name: 'AddCustomer', component: 'customerDetail'},
      {path: '/:id', name: 'CustomerDetail', component: 'customerDetail'}
    ]
  })

  
})(window.angular);



