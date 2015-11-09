//Define an angular module for our app
var app = angular.module('myApp', []);

app.controller('tasksController', function ($scope, $http) {

	$scope.tarefa = {
		id: "",
		task: "",
		done: ""
	};

function getTasksList() {
	$http({
		method: 'GET',
		url: '/task'
	}).then(function successCallback(response) {
		$scope.tasks = response.data;
	}, function errorCallback(response) {
		console.log(reponse);
	});
};

getTasksList();

$scope.addTask = function (task) {
	if (task != undefined && task != "") {
		$http({
			method: 'POST',
			url: '/task',
			headers: {'Content-Type': 'application/json'},
			data: {task: task, done: 0 }
		}).then(function successCallback(response) {
			console.log(response);
		}, function errorCallback(response) {
			console.log(reponse);
		});
		delete ($scope.tarefa);
		getTasksList();
	}
};
$scope.deleteTask = function (task) {
	if(confirm("Tem certeza que deseja excluir esta tarefa?")){
		$http({
			method: 'DELETE',
			url: '/task/' + task.id,
			headers: {'Content-Type': 'application/json'}
		}).then(function successCallback(response) {
			console.log('ok');
		}, function errorCallback(response) {
			console.log(reponse);
		});
		getTasksList();
	}
};

$scope.toggledone = function (task) {
	if (task != undefined && task != "") {
		$http({
			method: 'PUT',
			url: '/task/' + task.id,
			headers: {'Content-Type': 'application/json'},
			data: task
		}).then(function successCallback(response) {
		}, function errorCallback(response) {
			console.log(reponse);
		});
		getTasksList();
	}
};

});
