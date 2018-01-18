const express			= require('express');
const router 			= express.Router();
const expressValidator 	= require('express-validator');
router.use(expressValidator())
const multer			= require('multer');
const upload			= multer({dest: './uploads'});
const passport 			= require('passport');
const localStrategy 	= require('passport-local').Strategy;
const bcrypt			= require('bcryptjs');
const mongoose 			= require('mongoose');

const User 				= require('../../models/user');
const Post 				= require('../../models/post');
const Category 			= require('../../models/category');


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

router.post('/user/register', upload.single('profileImage'), ( req, res, next ) => {
	
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
});

router.get('/posts/:id', (req, res, next ) => {
	let id = req.params.id;
	Post.findById( id, ( err, post ) => {
		if ( err ) {
			return console.log('## Error finding post ##');
		}
		res.status(200).send({sucess: true, post: post});
	})
	
});

router.get('/posts/filter_by_category/:filter', ( req, res, next ) => {
	let category 		= req.params.filter;
	
	Post.find({category}, ( err, posts) => {
		if ( err ) {
			res.status(400).send({ success: false, message: 'Error finding posts.'});
		}

		res.status(200).send({ success: true, posts: posts });
	})
});

router.get('/posts/filter_by_author/:filter', ( req, res, next ) => {
	let author 		= req.params.filter;

	Post.find({author}, ( err, posts) => {
		if ( err ) {
			res.status(400).send({ success: false, message: 'Error finding posts.'});
		}

		res.status(200).send({ success: true, posts: posts });
	})
});


router.post('/posts/add', upload.single('mainImage'), ( req, res ) => {
	let title 		= req.body.title;
	let category 	= req.body.category;
	let body 		= req.body.body;
	let author 		= req.body.author;
	let mainImage 	= req.file ? req.file.filename : 'noPostImage.jpg';

	console.log(req.file)
	// form validation
	req.checkBody('title', 'Title field is required.').notEmpty();
	req.checkBody('category', 'Category field is required').notEmpty();
	req.checkBody('body', 'Body field is required.').notEmpty();
	req.checkBody('author', 'Author field is required.').notEmpty();

	//check error
	let errors = req.validationErrors();

	if( errors ) {
		res.send({errors})
	}
	else {
		const newPost = new Post({
			title, category, body, author, mainImage
		})

		Post.createPost(newPost, ( err, post ) => {
			if ( err ) throw err;
			console.log(post);
			res.status(200).send({success: true, message: 'Post Added.'});
		})
	}
});

router.get('/category', ( req, res ) => {
	let categories = Category.find({}, {}, ( err, categories ) => {
		if( err ) {
			return console.log('## Error finding categories ##');
		}
		res.send({ success: true, categories: categories });
	})
});

router.post('/category/add', ( req, res ) => {
	let name = req.body.name;

	// formValidation
	req.checkBody('name', 'name field is required.');

	let errors = req.validationErrors();

	if ( errors ) {
		req.send({errors});
	}
	else {
		const newCategory = new Category({ name });
		Category.createCategory(newCategory, ( err, category ) => {
			if ( err ) throw err;
			console.log(category);
			res.status(200).send({ success: true, message: 'Added newCategory' });
		})
	}
});


module.exports = router;