var router = require('express').Router();
const { route } = require('.');
var userCtrl = require('../controllers/user');


router.get('/index', userCtrl.index);
router.get('/shop', userCtrl.shop);
router.get('/payment',isLoggedIn, userCtrl.payment);
router.post('/index', isLoggedIn, userCtrl.review);
// router.post('/shop', isLoggedIn, userCtrl.order);
router.delete('/payment',isLoggedIn, userCtrl.removeItem);
router.post('/createOrder',isLoggedIn, userCtrl.createOrder);

function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;
