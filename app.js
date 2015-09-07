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
			percent: function(cur,buf){var tmp = order?parseFloat(buf)%parseFloat(cur):parseFloat(cur)%parseFloat(buf); order = false; return tmp;},
		}
		
		self.ac = function(){
			self.display = 0;
			buffer = false;
			buffer_last = false;
		};
		self.ce = function(){
			self.display = 0;
		};
		self.dot = function(){
			if(!/\./.test(self.display)) self.display += '.';
		};
		self.sign = function(){
			self.display = -self.display;
		};
		self.undo = function(){
			self.display+='';
			self.display = self.display.slice(0,self.display.length-1);
		};
		self.mc = function(){
			self.memory = 0;
		};
		self.mr = function(){
			self.display = self.memory;
		};
		self.mmin = function(){
			self.memory -= parseFloat(self.display);
		};
		self.madd = function(){
			self.memory += parseFloat(self.display);
		};
		self.sqr = function(){
			self.display = Math.sqrt(parseFloat(self.display));
		};
		self.mu = function(){
			console.log('mu');
			self.display = 0;
		};
		self.ops = function(op){
			if(click_last!='equal') self.equal();
			buffer = [self.display,op];
			buffer_last = false;
			flag = true;
			order = true;
			click_last = op;
		};
		self.equal = function(){
			if(buffer) {
				var tmp = op[buffer[1]](self.display,buffer_last||buffer[0]);
				if(!buffer_last)buffer_last=self.display;
				self.display = tmp;
				flag=true; click_last = 'equal';
			};
		};
		
		function touch($event) {
			var val = angular.element($event.target).attr('val');
			var ops = angular.element($event.target).attr('ops');
			if(val)
				/\d/.test(val)
					?(self.display=(!flag?(self.display+'').replace(/^0(?=\d)/, ''):'')+val,flag=false)
					:ops?self.ops(val):self[val]();
		};
	};
  
})();