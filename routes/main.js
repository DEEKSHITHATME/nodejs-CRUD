var app= module.parent.exports.app;
var items = require('../models/items.js');

app.get('/list', function(req,res){
	items.find({}, function(err, docs){
		res.render('list', { title: 'List', items:docs});
	});
});

app.post('/list', function(req,res){
	console.log(req.body);
	var newitem = new items({itemname: req.body.itemname, quantity: req.body.quantity});
  newitem.save(function(err,doc){
	if(!err){
		res.redirect('/list');
	}
	else
	{
		res.end(err);
	}
});
});


app.get('/p/delete/:id', function(req,res){
items.remove({_id: req.params.id}, function(err,doc){
	if(!err){
		res.redirect('/list');
	}
	else
	{
		res.end(err);
	}
});
});
app.get('/p/edit/:id', function(req,res){
	items.findOne({_id: req.params.id}, function(err, doc){
		if(!err){
			res.render('edit', {title: 'Edit', items:doc});
		}
		else
		{
			res.end(err);
		}
	});
});
app.post('/p/edit/:id', function(req,res){
	items.findOne({_id: req.params.id}, function(err,doc){
		if(!err){
			doc.itemname=req.body.itemname;
			doc.quantity= req.body.quantity;
			doc.save(function(err, doc){
				if(!err){
					res.redirect('/list');
				}
				else{
					res.end(err);
				}
			});
		}
		else
		{
			res.end(err);
		}
	});
});