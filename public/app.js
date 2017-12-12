$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)
});	

function addTodos(todos){
	//add todos to page here
	todos.forEach(function(todo){
		var newTodo = $('<li>'+todo.name+'</li>');
		newTodo.addClass('task')
		$('.list').append(newTodo);

	});
}