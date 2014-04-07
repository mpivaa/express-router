Express-router
===========

Rails-like router DSL + Controllers

Auto dispatch GET to index or show, POST to create, PUT to update, DELETE to destroy.

Adds some magic to express dispatch.

### Ex.

### routes.js

````javascript
module.exports = function(app) {
  routes = require('express-router/routes')(app);
  routes(function(){
  	this.resource("contacts"); // RESTful resource /contacts => controllers/api/contacts.js
  	this.namespace("/api", function() {
  		this.resource("contacts"); // /api/contacts => controllers/api/contacts.js
  	})
  	this.scope("/api", function() {
  	  this.get("groups", "groups#index"); // /api/groups => controllers/groups.js#index
  	});
  	this.root('campaigns'); // / => controllers/campaigns.js
  	//this.get
  	//this.post
  	//this.put
  	//this.scope
  	//this.namespace
  	//this.destroy
  })
}
````

### controllers/groups.js
Controller magically renders views based on controller+action names
````javascript
module.exports = function(app) {
  var Controller = require('express-router/restController')(app);
  return new Controller({
    index: function(req, res) {
      // renders views/groups/index.jade
      this.render({}, function(err, html){
        res.send(html);
      })
    }
  });
}
````

### controllers/api/contacts.js

````javascript
module.exports = function(app) {
  var Controller = require('express-router/restController')(app);
  var Model = require(app.get('models')).Contact;
  return new Controller(Model);
}
````



