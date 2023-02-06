const User = require("../models/user");
const Food = require("../models/food");

module.exports = {
  index,
  createReview,
  menu,
  payment,
  createOrder,
  placeOrder,
  showReceipts,
  deleteOrder,
};
function deleteOrder(req, res) {
  Food.deleteOne({ _id: req.params.id }, function (er, deleteorder) {
    Food.deleteMany(
      { user: req.user._id, finalOrder: false },
      function (err, deletedfood) {
        let newOrder = new Food(req.body);
        newOrder.save(function (e) {
          console.log("new order", newOrder);
        });
      }
    );
    res.redirect("/shop");
  });
}
function showReceipts(req, res) {
  Food.find({ user: req.user._id }, function (err, foods) {
    res.render("review", { foods });
    console.log("new food", foods);
  });
}
function placeOrder(req, res) {
  console.log("new console user.js line 37", req.body);
  let review = req.body.content;
  let rating = req.body.rating;
  console.log(/*'review' + review + ' rating ' + rating*/ "line38" + req.body);
  Food.deleteMany(
    { user: req.user._id, finalOrder: false },
    function (err, deletedfood) {
      console.log("deleted food", deletedfood);

      req.body.finalOrder = true;
      req.body.user = req.user._id;
      let burgers_final_price = req.body.burgers * 12;
      console.log("new changes", burgers_final_price);
      let fries_final_price = req.body.fries * 6;
      let soda_final_price = req.body.soda * 2;
      //amount
      let totalBurgers = req.body.burgers;
      let totalFries = req.body.fries;
      let totalSoda = req.body.soda;
      let totalOrder = (
        burgers_final_price +
        fries_final_price +
        soda_final_price
      ).toFixed(2);
      let tax = ((totalOrder / 100) * 7).toFixed(2);
      let finalPrice = totalOrder + tax;
      /*
  console.log('total burger', burgers_final_price)
  console.log('total Fries', fries_final_price)
  console.log('total Soda', soda_final_price)
  console.log('total PRICE ' + total_price );
*/
      res.render("review", {
        totalBurgers,
        totalFries,
        totalSoda,

        tax,
        fries_final_price,
        burgers_final_price,
        soda_final_price,
        finalPrice,
      });
    }
  );
  let newOrder = new Food(req.body);
  newOrder.save(function (e) {
    console.log("new order", newOrder);
  });
}
function createOrder(req, res) {
  req.body.burgerValue = req.body.burgerValue ? req.body.burgerValue : 0;
  req.body.friesValue = req.body.friesValue ? req.body.friesValue : 0;
  req.body.sodaValue = req.body.sodaValue ? req.body.sodaValue : 0;
  req.body.content = req.body.content ? req.body.reviews.content : "";
  req.body.rating = req.body.rating ? req.body.rating : 5;
  req.body.user = req.user._id;
  req.body.finalOrder = false;
  let newOrder = new Food(req.body);
  newOrder.save(function (e) {
    res.redirect("/payment");
  });
}

function payment(req, res) {
  Food.find({ user: req.user._id }, function (err, orders) {
    console.log(orders, "This is the orders");

    let burgers = orders.reduce(function (a, e) {
      a += e.burgerValue;
      return a;
    }, 0);
    let fries = orders.reduce(function (a, e) {
      a += e.friesValue;
      return a;
    }, 0);
    let soda = orders.reduce(function (a, e) {
      a += e.sodaValue;

      return a;
    }, 0);
    res.render("payment", {
      orders,
      burgers,
      fries,
      soda,
    });
  });
}

function menu(req, res) {
  res.render("menu", {});
}
function createReview(req, res) {
  console.log("line 118" + req.body);
  Food.findById(req.params.id, function (err, userReview) {
    if (err) {
      console.log("error line 121", err);
      res.send(err);
    }
    console.log(userReview);
    userReview.reviews.push(req.body);
    console.log(userReview, "revieskkkkkkkkkkkkkkkkkkkkkkk");
    userReview.save(function (err) {
      res.render("index");
    });
    res.redirect("/shop");
  });
}

function index(req, res, next) {
  console.log(req.query);
  console.log(req.user);
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  let sortKey = req.query.sort || "name";
  User.find(modelQuery)
    .sort(sortKey)
    .exec(function (err, users) {
      if (err) return next(err);
      res.render("index", {
        users,
        user: req.user,
        name: req.query.name,
        sortKey,
      });
    });
}
