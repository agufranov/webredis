(function() {
  App.controller("RedisCtrl", function($scope, $http) {
    $scope.isLoading = false;
    $scope.refresh = function() {
      $scope.isLoading = true;
      return $http({
        method: "GET",
        url: "/records"
      }).success(function(data, status, headers, config) {
        $scope.records = data;
        return $scope.isLoading = false;
      });
    };
    $scope.refresh();
    return $(document).on("keypress", function(event) {
      if (event.keyCode !== 114) {
        return;
      }
      $scope.refresh();
      return event.preventDefault();
    });
  });

}).call(this);
