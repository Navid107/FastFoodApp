var router = require('express').Router();
var userCtrl = require('../controllers/user');


router.get('/index', userCtrl.index);
router.get('/shop', userCtrl.menu);
router.get('/payment',isLoggedIn, userCtrl.payment);
router.get('/review', isLoggedIn, userCtrl.showReceipts);
router.post('/createReview',isLoggedIn, userCtrl.createReview);
router.post('/createOrder',isLoggedIn, userCtrl.createOrder);
router.post('/payment' , isLoggedIn, userCtrl.placeOrder)
router.delete('/payment/:id', isLoggedIn, userCtrl.deleteOrder)

function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;
