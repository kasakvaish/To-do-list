const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 4000;
var i1 = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true, useUnifiedTopology:true});
const itemSchema={
	name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
	name: "Welcome to my Home"
});

const data = [item1];


app.get("/", function(req, res){
	// res.send("Hey Manu");
	
	Item.find({}, function(err, f){

		if(f.length === 0){
			Item.insertMany(data, function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log('Succesfully Inserted in DB');
				}
			});

			res.redirect("/");	
		}

		else{
			res.render("list", {newListItems:f});
		}
	});
	
});

app.post("/", function(req, res){
	const itemName = req.body.n;
	// console.log(i);
	// i1.push(i);
	// res.render("list", {newListItems:i});
	// res.redirect("/");
	const item = Item({
		name:itemName
	});
	item.save();
});

app.post("/delete", function(req, res){
	const check = req.body.checkbox;
	Item.findByIdAndRemove(check, function(err){
		if(!err){
			console.log('Succesfully Deleted');
			res.redirect("/");
		}
	});
});



app.listen(port, () => {
	console.log(`Running on port ${port}`);
});