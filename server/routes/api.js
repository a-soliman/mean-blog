const express			= require('express');
const router 			= express.Router();
const expressValidator 	= require('express-validator');
router.use(expressValidator())
const multer			= require('multer');
const upload			= multer({dest: './uploads'});
const passport 			= require('passport');
const localStrategy 	= require('passport-local').Strategy;
const bcrypt			= require('bcryptjs');
const mongoose 		= require('mongoose');

const User 				= require('../../models/user');
const Post 				= require('../../models/post');


const dbUrl = 'mongodb://ahmed_soliman:123456@ds249707.mlab.com:49707/mean_ng5_auth'
mongoose.connect( dbUrl , (err) => {
	if(err) {
		return console.log(err)
	}
});
const db = mongoose.connection;


router.get('/', ( req, res ) => {
	res.send({"messagee": "working"})
});

router.post('/user/register', upload.single('profileImage'), ( req, res ) => {
	
	let name 		 = req.body.name;
	let email 		 = req.body.email;
	let username	 = req.body.username;
	let password 	 = req.body.password;
	let password2 	 = req.body.password2;
	let profileImage = req.file ? req.file.filename : 'noImage.jpg';

	// Form Validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'email field is required').notEmpty();
	req.checkBody('email', 'email is not valid').isEmail();
	req.checkBody('username', 'username field is required').notEmpty();
	req.checkBody('password', 'password field is required').notEmpty();
	req.checkBody('password2', 'passwords do not match.').equals(req.body.password);

	// Check Validation errors
	let errors = req.validationErrors();

	if ( errors ) {
		res.send({errors});
	}
	else {
		const newUser = new User({
			name, email, username, password, profileImage
		});

		User.createUser(newUser, ( err, user ) => {
			if ( err ) throw err;
			console.log(user);
			res.status(200).send({status: 'success', message: 'You are now registered and can login.'});
		})

	}
});

router.post('/user/login', ( req, res ) => {
	let username	= req.body.username;
	let password 	= req.body.password;

	// Form Validation
	req.checkBody('username', 'Name field is required').notEmpty();
	req.checkBody('password', 'password field is required').notEmpty();
	
	// Check Validation errors
	let errors = req.validationErrors();

	if ( errors ) {
		res.send({errors});
	}
	else {
		User.findOne({ username }, ( err, user ) => {
			if ( err ) {
				return res.send({success: false, message: "An error has occurred, Please try again later."});
			}
			if ( !user ) {
				return res.send({success: false, message: "Invalid username"});
			}
			
			bcrypt.compare(password, user.password, ( err, isMatch ) => {
				if ( err ) {
					res.send({success: false, message: "Invalid password"});
				}

				if(isMatch) {
					res.status(200).send({status: 'success', message: 'You are now LoggedIn', user});
				} else {
					res.send({success: false, message: "Invalid password"});
				}

			})
		})

	}
});

router.get('/user/logout', ( req, res ) => {
	req.logout();
	res.send({success: true, message: 'You are now loggedout.'});
});

router.get('/posts', ( req, res ) => {
	let posts = Post.find({}, {}, ( err, posts ) => {
		if( err ) {
			return console.log('## Error finding posts ##');
		}
		res.send({ status: 'success', posts: posts });
	});
	
})

module.exports = router;