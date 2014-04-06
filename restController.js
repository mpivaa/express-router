module.exports = function(app) {
	var Controller = require('./controller')(app);
	var util = require('util');
	return function(Model, actions) {
		var _actions = {
			index: function(req, res) {
				Model.find({}, function(err, models) {
					if(err)
					{
						util.log(err);
						return res.send(400);
					}
					return res.json(models, 200);
				})
			},
			show: function(req, res) {
				Model.findOne({_id: req.params.id}, function(err, model) {
					if(err)
					{
						util.log(err);
						return res.send(400);
					}
					return res.json(model, 200);
				})
			},
			update: function(req, res) {
				Model.findOne({_id: req.params.id}, function(err, model) {
					if(err)
					{
						util.log(err);
						return res.send(400);
					}
					model.massAssign(req.body);
					return model.save(function (err) {
			      if (err) {
			        util.log(err);
							return res.send(400);
			      }
			      return res.json(model, 200);
			    });
				})
			},
			create: function(req, res) {
				Model.find({_id: req.params.id}, function(err, models) {
					if(err)
					{
						util.log(err);
						return res.send(400);
					}
					var model = new Model.massAssign(req.body);
					return model.save(function (err) {
			      if (err) {
			        util.log(err);
							return res.send(400);
			      }
			      return res.json(model, 200);
			    });
				})
			},
			destroy: function(req, res) {
				Model.findOne({_id: req.params.id}, function(err, models) {
					if(err)
					{
						util.log(err);
						return res.send(400);
					}
					return model.remove(function (err) {
			      if (err) {
			        util.log(err);
							return res.send(400);
			      }
			      return res.send(200);
			    });
				})
			}
		}
		for(var a in actions)
			_actions[a] = actions[a];

		return new Controller(_actions);
	}
}
