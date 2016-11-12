(function(angular) {
  'use strict';
angular.module('cars') 

  .component('carList', {
    templateUrl: '/javascripts/components/cars/carList.html',
    controller: CarList
  });

  CarList.$inject = ["$http"];


  function CarList($http){
  	var $ctrl = this; 
  	$ctrl.cars = [];
  	$ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
  		$http.get('/api/cars').
  		then(function(res){  //http get returns a promise
  			console.log(res)
  			$ctrl.cars = res.data;
  		})
  	};
   
  }

 
})(window.angular);

