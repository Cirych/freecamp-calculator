(function () {
  'use strict';
  angular
      .module('app',[])
      .controller('AppCtrl', appCtrl);
	  
	function appCtrl ($scope) {
		var self = this;
		self.display = '';
		self.touch = touch;
		self.memory = 0;
		
		self.ac = function(){
			console.log('AC');
			self.display = 0;
		};
		self.ce = function(){
			console.log('ce');
			self.display = 0;
		};
		self.dot = function(){
			console.log('dot');
			self.display += '.';
		};
		self.sign = function(){
			console.log('sign');
			self.display = -self.display;
		};
		self.undo = function(){
			console.log('undo');
			self.display = self.display.slice(0,self.display.length-1);
		};
		self.mc = function(){
			console.log('m-c');
			self.memory = 0;
		};
		self.mr = function(){
			console.log('m-r');
			self.display = self.memory;
		};
		self.mmin = function(){
			console.log('m-min');
			self.memory -= parseInt(self.display);
		};
		self.madd = function(){
			console.log('m-add');
			self.memory += parseInt(self.display);
		};
		self.add = function(){
			console.log('add');
			self.display = 0;
		};
		self.substr = function(){
			console.log('substr');
			self.display = 0;
		};
		self.multi = function(){
			console.log('multi');
			self.display = 0;
		};
		self.divide = function(){
			console.log('divide');
			self.display = 0;
		};
		self.sqr = function(){
			console.log('sqr');
			self.display = Math.sqrt(self.display);
		};
		self.mu = function(){
			console.log('mu');
			self.display = 0;
		};
		self.percent = function(){
			console.log('percent');
			self.display = 0;
		};
		self.equal = function(){
			console.log('equal');
			self.display = 0;
		};
		
		function touch($event) {
			var val = angular.element($event.target).attr('val');
			/\d/.test(val)?self.display = self.display*10+parseInt(val):self[val]();
		};
		function AC() {
			console.log('test');
		};
	};
  
})();