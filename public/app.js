$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)


	$('#todoInput').keypress(function(event){
		if(event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'li', function(){
		updateTodo($(this))
	})

	//listening for spans INSIDE of list
	$('.list').on('click', 'span', function(e){
		e.stopPropagation();
		removeTodo($(this).parent());
	})
});	

function addTodos(todos){
	//add todos to page here
	todos.forEach(function(todo){
		addTodo(todo);
	});
}

function addTodo(todo){
	var newTodo = $('<li>'+ todo.name +'<span>X</span></li>');
		newTodo.addClass('task')
		newTodo.data('id', todo._id);
		newTodo.data('completed', todo.completed);

		
	if(todo.completed){
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
}

function createTodo(){
	//send request to create a new todo
	var usrInput = $('#todoInput').val();
	$.post('/api/todos',{name: usrInput})
	.then(function(newTodo){
		$('#todoInput').val('');
		addTodo(newTodo);
	})
	.catch(function(err){
		console.log(err);
	})
}

function removeTodo(todo){
	var clickedId = todo.data('id');
		var deleteUrl = '/api/todos/' + clickedId;
		// $(this).parent().remove();
		$.ajax({
			method: 'DELETE',
			url: deleteUrl
		})
		.then(function(data){
			todo.remove();
		})
		.catch(function(err){
			console.log(err);
		})
}

function updateTodo(todo){
	var updatedUrl = '/api/todos/' + todo.data('id');
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone}
	console.log(updateData);
	$.ajax({
		method: 'PUT',
		url: updatedUrl,
		data: updateData

	})
	.then(function(updatedTodo){
		todo.toggleClass('done')
		todo.data('completed', isDone);
	})
}
