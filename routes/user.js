var router = require('express').Router();
var userCtrl = require('../controllers/user');

// GET /students
router.get('/index', userCtrl.index);
router.get('/shop', userCtrl.shop);
router.get('/payment', userCtrl.payment);
router.post('/index', isLoggedIn, userCtrl.review);
// Authorizing the user to use a route
// probably only want to use this on
// post, put or delete routes
function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;
