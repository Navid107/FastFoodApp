const User = require('../models/user');
const Food = require('../models/food');
const { Forbidden } = require('http-errors');

module.exports = {
  index,
  review,
  shop,
  payment,
  removeItem,
  createOrder
  
};
function createOrder(req, res){
  console.log(req.body)
  req.body.user = req.user._id;
  let newOrder = new Food(req.body)
  console.log(newOrder, "new Order")
  newOrder.save(function (e){
    res.redirect('/payment')
  })
}

function removeItem(req, res){
  res.render('payment',{

  })
}
function payment(req, res){
  Food.find({user: req.user._id}, function(err, orders){
    console.log(orders, "This is the orders");
  
    let burgers = orders.reduce(function(a,e){
      a += e.burgerValue;
      return a;
    },0)
    let fries = orders.reduce(function(a,e){
      a += e.friesValue;
      return a;
    },0)
    let soda = orders.reduce(function(a,e){
      a += e.sodaValue;
      console.log(a, "this is soda")
      return a;
    },0)
  res.render('payment',{
    orders,burgers, fries, soda
  })
})
}

function shop(req, res){
  res.render('shop',{

  })
}
function review(req, res){
  req.user.facts.push(req.body);
   // req.user is a mongoose document
   // where did we assign the mongoose document to req.user
  req.user.save(function(err){
    res.redirect('/index')
  })
}

function index(req, res, next) {
  console.log(req.query)
  console.log(req.user)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}