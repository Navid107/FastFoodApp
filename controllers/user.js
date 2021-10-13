const User = require('../models/user');
const Food = require('../models/food');




module.exports = {
  index,
  review,
  menu,
  payment,
  createOrder,
  placeOrder,
  showReview,
  deleteOrder

};
function deleteOrder(req, res){
  Food.deleteOne({_id: req.params.id}, function(er, deleteorder){
    Food.deleteMany({user: req.user._id, finalOrder: false}, function(err, deletedfood){
    let newOrder = new Food(req.body)
    newOrder.save(function(e){
      console.log('new order', newOrder)
    })
  })
    res.redirect('/shop')
  }
    )
}
function showReview(req, res){
  Food.find({user: req.user._id}, function(err, foods){
    res.render('review', {foods})
  })
}
function placeOrder(req,res){
  console.log('new conslo', req.body)
  Food.deleteMany({user: req.user._id, finalOrder: false}, function(err, deletedfood){
    console.log('deleted food', deletedfood)

  req.body.finalOrder = true;
  req.body.user = req.user._id
  req.body.price = (req.body.burgers * 12 )+ (req.body.fries * 6 )+ (req.body.soda *2 );
  console.log('final Price', req.body.price)
  let newOrder = new Food(req.body)
  
  newOrder.save(function(e){
    console.log('new order', newOrder)
    res.redirect('/review')
  })
})
}

function createOrder(req, res){
  req.body.burgerValue = req.body.burgerValue ? req.body.burgerValue : 0;
  req.body.friesValue = req.body.friesValue ? req.body.friesValue : 0;
  req.body.sodaValue = req.body.sodaValue ? req.body.sodaValue : 0;
  req.body.user = req.user._id;
  req.body.finalOrder = false;
  let newOrder = new Food(req.body)
  newOrder.save(function (e){
    res.redirect('/payment')
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
      
      return a;
    },0)
  res.render('payment',{
    orders,burgers, fries, soda
  })
})
}

function menu(req, res){
  res.render('menu',{

  })
}
function review(req, res){
	console.log(req.body)
	Food.findById(req.params.id, function(err, userReview){ 
		if(err){
			console.log(err)
			res.send(err)
		}
		console.log(userReview)
		userReview.review.push(req.body); 
    console.log(userReview,"revieskkkkkkkkkkkkkkkkkkkkkkk")
		userReview.save(function(err){		
				res.redirect(`/index${req.params.id}`); 	
		});	
	});
}

function index(req, res, next) {
  console.log(req.query)
  console.log(req.user)
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    res.render('index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}