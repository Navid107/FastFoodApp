var router = require('express').Router();
const { route } = require('.');
var userCtrl = require('../controllers/user');


router.get('/index', userCtrl.index);
router.get('/shop', userCtrl.menu);
router.get('/payment',isLoggedIn, userCtrl.payment);
router.get('/review', isLoggedIn, userCtrl.showReview);
router.post('/index/:id/review', userCtrl.review);
router.post('/createOrder',isLoggedIn, userCtrl.createOrder);
router.post('/payment' , isLoggedIn, userCtrl.placeOrder)

function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;
