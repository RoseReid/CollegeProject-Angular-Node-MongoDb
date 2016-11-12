(function(angular) {
  'use strict';
angular.module('customers') 

  .component('customerList', {
    templateUrl: '/javascripts/components/customers/customerList.html',
    controller: CustomerList
  });

  CustomerList.$inject = ["$http"];


  function CustomerList($http){
  	var $ctrl = this; 
  	$ctrl.customers = [];
  	$ctrl.$routerOnActivate = function(next){   //when this component is loaded and is activated-the code inside here will run
  		$http.get('/api/customers').
  		then(function(res){  //http get returns a promise
  			console.log(res)
  			$ctrl.customers = res.data;
  		})
  	}
  }
  
})(window.angular);

