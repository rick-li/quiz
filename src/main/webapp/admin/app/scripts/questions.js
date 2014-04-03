app.controller('QuestionCtrl', function($scope, $log, $timeout, $resource, $routeParams, $upload) {
    $log.log('QuestionCtrl ', $routeParams['qsId']);

    $scope.qsId = $routeParams['qsId'];

    $scope.imageBasePath = "/quiz/mvc/images/";
    $scope.newItemCreated = false;
    $scope.newOptionCreated = false;

    var Question = $resource('/quiz/mvc/questions/:id?questionSetId=:qsId', {
        id: '@id',
        qsId: '@qsId'
    }, {
        query: {
            isArray: false,
            method: 'GET'
        }
    });
    $scope.questions = [];
    $scope.pagedQuestions = [];
    $scope.questionSize = 0;
    $scope.selectedItems = [];
    $scope.selectedItem = {
        options: [],
        rightAnswer: []
    };
    $scope.selectedOption = null;
    $scope.$watch('selectedItems', function(newVal) {

        if (newVal && newVal[0]) {
            $scope.selectedItem = newVal[0];
        }
    }, true);

    $scope.pagingOptions = {
        // pageSizes: list of available page sizes.
        pageSizes: [10, 20, 50],
        //pageSize: currently selected page size. 
        pageSize: 10,
        //currentPage: the uhm... current page.
        currentPage: 1
    };
    $scope.dataOptions = {
        data: 'pagedQuestions',
        columnDefs: [{
            field: 'name',
            displayName: '题目'
        }, {
            displayName: '',
            width: 50,
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"> <button type="button" class="btn btn-default" ng-click="delete(item)" ng-confirm-click="是否要删除{{item.name}}？"><i class="fa fa-times"></i></button></div>'
        }],
        rowHeight: 45,
        selectedItems: $scope.selectedItems,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        enablePaging: true,
        showFooter: true,
        multiSelect: false,
    };

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            // $scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage
            var start = ($scope.pagingOptions.currentPage - 1) * $scope.pagingOptions.pageSize;
            $log.log('====> start is ', start);
            $scope.pagedQuestions = $scope.questions.slice(start, start + $scope.pagingOptions.pageSize);
            $log.log('====> pageQuestions is ', $scope.pagedQuestions);
            $scope.totalServerItems = $scope.questions.length;
        }
    }, true);

    $scope.query = function() {
        Question.query({
            qsId: $routeParams['qsId']
        }, function(data) {
            $log.log('result is ', data.result);
            $scope.questions = data.result;
            $scope.selectedItem = $scope.questions[0];
            $scope.totalServerItems = $scope.questions.length;
            var start = ($scope.pagingOptions.currentPage - 1) * $scope.pagingOptions.pageSize;
            $scope.pagedQuestions = $scope.questions.slice(start, $scope.pagingOptions.pageSize);

        });
    };
    $scope.query();

    $scope.select = function(item) {
        $scope.selectedItem = item;
    };

    $scope.new = function() {
        $scope.newItemCreated = true;
        $timeout(function() {
            $scope.newItemCreated = false;
        }, 3000);
        $scope.selectedItem = {};
    };

    $scope.newOption = function() {
        $scope.newOptionCreated = true;
        $timeout(function() {
            $scope.newOptionCreated = false;
        }, 3000);
        $scope.selectedOption = null;
    };

    $scope.selectAnswer = function(e, opt) {
        if (e.target.checked) {
            $scope.selectedItem.rightAnswer = [opt];
        } else {
            $scope.selectedItem.rightAnswer = [];
        }

    };
    $scope.isAnswer = function(opt) {
        if (!$scope.selectedItem.rightAnswer) {
            return false;
        }
        return $scope.selectedItem.rightAnswer.indexOf(opt) != -1;
    };

    $scope.deleteOpt = function(opt) {
        var opts = $scope.selectedItem.options;
        opts.splice(opts.indexOf(opt), 1);
    };

    $scope.onFileSelect = function($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: '/quiz/mvc/questions/uploadimage', //upload.php script, node.js route, or servlet url
                // method: POST or PUT,
                // headers: {'headerKey': 'headerValue'},
                // withCredentials: true,
                data: {

                },
                file: file,
                // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
                /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                if (data.status != 'SUCCESS') {
                    alert("图片上传失败");
                    return;
                }


                $scope.selectedItem.imageFileName = data.result.filename;
            });
        }
    };

    $scope.addOpt = function(opt) {
        if (!$scope.selectedItem.options) {
            $scope.selectedItem.options = [];
            $scope.selectedItem.rightAnswer = [];
        }
        if ($scope.selectedItem.options.length >= 6) {
            alert("选项不能大于6个");
            return;
        }
        if ($scope.selectedItem.options.indexOf(opt) != -1) {
            alert("不能重复");
            return;
        }
        $scope.selectedItem.options.push(opt);
        $scope.selectedOption = null;
    };

    $scope.delete = function(item) {
        Question.delete($scope.selectedItem, function() {
            $scope.query();
        });
    };

    $scope.submit = function(item) {
        $log.log('submit question.', item);
        if (!item.rightAnswer || item.rightAnswer.length <= 0) {
            alert("必须选择答案");
            return;
        }
        item.questionSetId = $scope.qsId;
        item.imageFileName = $scope.selectedItem.imageFileName;
        Question.save(item, function() {
            $scope.query();
        });
    };
});