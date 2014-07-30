App.controller "RedisCtrl", ($scope, $http) ->
  $scope.isLoading = false
  $scope.refresh = ->
    $scope.isLoading = true
    $http method: "GET", url: "/records"
      .success (data, status, headers, config) ->
        $scope.records = data
        $scope.isLoading = false

  $scope.refresh()

  $(document).on "keypress", (event) ->
    return if event.keyCode != 114
    $scope.refresh()
    event.preventDefault()
