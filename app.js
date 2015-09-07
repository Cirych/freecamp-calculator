(function () {
  'use strict';
  angular
      .module('app',[])
      .controller('AppCtrl', appCtrl);
	  
	function appCtrl ($scope) {
		var self = this;
		self.display = '';
		var buffer = false;
		var buffer_last = false;
		var flag = false;
		var order = true;
		var click_last = 'equal';
		self.touch = touch;
		self.memory = 0;
		var op = {
			add: function(cur,buf){return parseFloat(buf)+parseFloat(cur);},
			sub: function(cur,buf){var tmp = order?parseFloat(buf)-parseFloat(cur):parseFloat(cur)-parseFloat(buf); order = false; return tmp;},
			multi: function(cur,buf){return parseFloat(buf)*parseFloat(cur);},
			divide: function(cur,buf){var tmp = order?parseFloat(buf)/parseFloat(cur):parseFloat(cur)/parseFloat(buf); order = false; return tmp;},
		}
		
		self.ac = function(){
			console.log('AC');
			self.display = 0;
			buffer = false;
			buffer_last = false;
		};
		self.ce = function(){
			console.log('ce');
			self.display = 0;
		};
		self.dot = function(){
			console.log('dot');
			if(!/\./.test(self.display)) self.display += '.';
		};
		self.sign = function(){
			console.log('sign');
			self.display = -self.display;
		};
		self.undo = function(){
			console.log('undo');
			self.display+='';
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
			self.memory -= parseFloat(self.display);
		};
		self.madd = function(){
			console.log('m-add');
			self.memory += parseFloat(self.display);
		};
		self.sqr = function(){
			console.log('sqr');
			self.display = Math.sqrt(parseFloat(self.display));
		};
		self.mu = function(){
			console.log('mu');
			self.display = 0;
		};
		self.percent = function(){
			console.log('percent');
			self.display = 0;
		};
		self.ops = function(op){
			self.equal();
			buffer = [self.display,op];
			buffer_last = false;
			flag = true;
			order = true;
			click_last = op;
		};
		self.equal = function(){
			//console.log('equal');
			if(buffer) {
				var tmp = op[buffer[1]](self.display,buffer_last||buffer[0]);
				if(!buffer_last)buffer_last=self.display;
				self.display = tmp;
				flag=true;
			};
		};
		
		function touch($event) {
			var val = angular.element($event.target).attr('val');
			var ops = angular.element($event.target).attr('ops');
			if(val)
				/\d/.test(val)
					?(self.display=(!flag?(self.display+'').replace(/^0+/, ''):'')+val,flag=false)
					:ops?self.ops(val):self[val]();
		};
	};
  
})();