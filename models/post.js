const mongoose 		= require('mongoose');



//User Schema

const PostSchema = mongoose.Schema({
	title: {
		type: String,
	},
	category: {
		type: String
	},
	author: {
		type: String
	},
	body: {
		type: String
	},
	date: {
		type: Date
	},
	image: {
		type: String
	}
});

const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.createPost = ( newPost, callback ) => {
	newPost.save(callback);
}