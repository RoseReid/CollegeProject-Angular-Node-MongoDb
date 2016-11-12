(function(angular) {
  'use strict';
angular.module('cars', []) //Sq brackets creates a new instance of cars to put more data in it

  .component('cars', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'CarList',   component: 'carList', useAsDefault: true},
      {path: '/addCar', name: 'AddCar', component: 'carDetail'},
       {path: '/:id', name: 'CarDetail', component: 'carDetail'}

    ]
  })

  
})(window.angular);

