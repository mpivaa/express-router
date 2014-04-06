module.exports = function(app) {
	return function(actions) {
		var Controller = function(name, action) {
			this.name = name;
			this.action = action;
		} 
		Controller.prototype.beforeAction = function() {}
		Controller.prototype.afterAction = function() {}
		Controller.prototype.actions = actions;
		Controller.prototype.render = function() {
			var args = [];
			for(var i = 0; i < arguments.length; i++) {
			  args.push(arguments[i]);
			}
			if(typeof args[0] !== 'String')
			{
				args.unshift(this.action);
			}
			if(args[0].indexOf('/') !== 0)
				args[0] = this.name+'/'+args[0];
			return app.render.apply(app, args);
		}
		return Controller;
	}
}