tasksListApp.controller('tasksListCtrl', function ($scope, $http) {

    // get initial tasks list fro tasks.json
    $http.get("./tasks.json").then(function(response) {
            $scope.tasksList = response.data;
            $scope.statuscode = response.status;
            $scope.statustext = response.statustext;
        });

    // add new task when user click the add button
    $scope.addNewTask = function (newTask) {
       if (newTask && $scope.tasksList.indexOf(newTask) === -1) {
           $scope.tasksList.push({
               taskName: newTask,
               isDone: false
           });
       }
   };

   // remove certain task when user click the delete button
   $scope.removeTask = function (index) {
       $scope.tasksList.splice(index, 1);
       $scope.isEditPanelVisible = false;
   };

   // show task editing panel whe user click certain edit button
   $scope.showEditPanel = function (taskIndex) {
       $scope.currentEditingTaskIndex = taskIndex;
       $scope.isEditPanelVisible = $scope.isEditPanelVisible || !$scope.isEditPanelVisible;
       $scope.currentEditingTaskText = $scope.tasksList[taskIndex].taskName;
   };

   // save editing changes and hide editing panel when user click save button
    $scope.editTask = function () {
        $scope.tasksList[$scope.currentEditingTaskIndex].taskName = $scope.currentEditingTaskText;
        $scope.isEditPanelVisible = false;
    };

});
