app.service('FormTypeService', function($resource, $log) {
    var FieldType = $resource('/mvc/formfieldtype/:id', {
        id: '@id'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });

    return FieldType;
});

app.controller('FormTypeCtrl', function($scope, $resource, $log, FormTypeService) {

    var query = function() {
        FormTypeService.query(function(data) {
            $scope.fieldTypes = data.result;
        });
    };

    query();

    $scope.submit = function(item) {
        FormTypeService.save(item, function() {
            query();
        });
    };

    $scope.delete = function(item) {
        FormTypeService.delete(item, function() {
            query();
        });
    };

});