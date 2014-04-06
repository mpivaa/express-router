/*
route = require('routesjs')(app);
route(function (){
	this.resource("users");
	this.namespace("/api", function () {
		this.resource("apps");
		this.root('apps#index');
	})
	this.get('dashboard', 'dashboard#index');
	this.root('dashboard#index');
	console.log(app.routes)
})
*/

module.exports = function(app) {
	var run = function(_to, namespace) {
		return function() {
			var to = _to.split('#');
			if (to.length == 1)
				to.push('index');
			var Controller = require(app.get('controllers')+namespace+'/'+to[0])(app);
			var controller = new Controller(namespace+'/'+to[0], to[1]);
			var args = [to[1]];
			for(var i = 0; i < arguments.length; i++) {
			  args.push(arguments[i]);
			}
			controller.beforeAction.apply(controller, args);
			var ret = controller.actions[to[1]].apply(controller, arguments);
			controller.afterAction.apply(controller, args);
			return ret;
		}
	}

	var _namespace = function(scope, callback, namespace) {
		namespace = namespace || ''
		this.root = function(to) {
			app.get(scope+'/', run(to, namespace));
		}

		this.get = function(path, to) {
			app.get(scope+path, run(to, namespace));
		}

		this.post = function(path, to) {
			app.post(scope+path, run(to, namespace));
		}

		this.destroy = function(path, to) {
			app.delete(scope+path, run(to, namespace));
		}

		this.put = function(path, to) {
			app.put(scope+path, run(to, namespace));
		}

		this.resource = function(controller) {
			this.get("/"+controller, controller+"#"+"index");
			this.get("/"+controller+"/:id", controller+"#"+"show");
			this.get("/"+controller+"/:id/edit", controller+"#"+"edit");
			this.get("/"+controller+"/new", controller+"#"+"new");
			this.post("/"+controller, controller+"#"+"create");
			this.put("/"+controller+"/:id", controller+"#"+"update");
			this.destroy("/"+controller+"/:id", controller+"#"+"destroy");
		}

		this.namespace = function (nscope, callback) {
			return new _namespace(namespace+nscope, callback, namespace+nscope); 
		}

		this.scope = function(nscope, callback) {
			return new _namespace(scope+nscope, callback, namespace)
		}

		return callback.apply(this);
	}

	return function (callback) {
		new _namespace('', callback);
	}
}
