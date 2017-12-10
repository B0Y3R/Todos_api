var mongoose = require('mongoose');


var todoSchema = mongoose.Schema({
	name: {
		type: String,
		required: "Name Cannot Be Blank!"
	},

	completed: {
		type: Boolean,
		default: false

	},

	completed_date: {
		type: Date,
		default: Date.now

	}
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
//name
//completed 
//completed date