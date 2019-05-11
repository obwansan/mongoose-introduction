// mongoose is an ODM (Object Data Mapper), i.e. a way to write JS code that can interact with the DB.
// i.e. a JS layer on top of mongodb.
var mongoose = require("mongoose");

// Tell mongoose to connect to the server we have running (mongod)
// Connect to cat_app DB. If the cat_app DB doesn't exist, it will be created and connected to.
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

// Create a cat schema (pattern of data every cat must have, bit like a class interface in PHP and ES6)
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String,
});

// Compile the cat schema into a cat model (kind of like a class in PHP) that can 
// be used to create, read, update and delete cats in the DB.
// You pass the singular version of your model (called "Cat") and mongoose automagically 
// creates a pluralised collection in the database (e.g. db.cats).
// Convention is to capitalize a model ("Cat"), just like with PHP classes...
var Cat = mongoose.model("Cat", catSchema);

// Create (construct) a new cat object
var george = new Cat({
  name: "Mrs. Norris",
  age: 7,
  temperament: "Evil"
});

/*
// Save it to the database
// (When a schema is compiled into a model in mongoose, the model has a bunch of built-in 
// methods such as .save, .create, .find etc)).
// 'cat' here is what is returned from the DB, i.e. the object that was assigned to the george variable.
// The callback function only runs when the .save() method call has completed.
george.save(function(err, cat) {
  if(err) {
    console.log("SOMETHING WENT WRONG!");
  } else {
    console.log("WE JUST SAVED A CAT TO THE DB");
    console.log(cat);
  }
});
*/

// Shortcut for constructing a new Cat object and saving it to the DB.
Cat.create({
  name: "Garfield",
  age: 10,
  temperament: "Cunning"
}, function(err, cat) {
  if(err) {
    console.log(err);
  } else {
    console.log(cat);    
  }
})

// Retrieve all cats and console.log each one.
// Calling a method on the Cat model accesses the pluralised collection in the database (e.g. db.cats).
// Pass in empty object because we want all the cats, not a particular one.
// The callback function only runs when the .save() method call has completed.
Cat.find({}, function(err, cats) {
  if(err) {
    console.log('OH NO, ERROR!');
    console.log(err);
  } else {
    console.log('ALL THE CATS...');
    console.log(cats);
  }
});