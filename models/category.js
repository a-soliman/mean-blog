const mongoose 		= require('mongoose');

//Post Schema
const CategorySchema = mongoose.Schema({
	name: {
		type: String,
	}
});

const Category = module.exports = mongoose.model('Category', CategorySchema);


module.exports.createCategory = ( newCategory, callback ) => {
	newCategory.save(callback);
}