app.directive('datatable', function($log) {

    var initTable = function(element, content) {
        var options = {
            aoColumns: [{
                "sTitle": "分数"
            }, {
                "sTitle": "用时"
            }, {
                "sTitle": "名字"
            }, {
                "sTitle": "手机号"
            }, {
                "sTitle": "生日"
            }],

            aaData: content

        };
        element.dataTable(options);
    };
    return {
        restrict: 'E',
        scope: {
            content: '='
        },
        replace: true,

        template: function(element, attrs) {
            $log.log('=======>template');
            var strVar = "";
            strVar += "<table id='testgrid' class='datatable table table-striped table-bordered'>";
            strVar += "<\/table>";
            return strVar;
        },

        link: function(scope, element) {


            scope.$watch('content', function(content) {
                $log.log('content is ', scope.content);
                if (scope.content) {
                    if (!scope.inited) {
                        initTable(element, content);
                        scope.inited = true;
                    }
                }
            });



        }
    }
});

app.directive('ckeditor', function($log) {
    return {
        restrict: 'E',
        scope: {
            content: '=',
            ckheight: '@'
        },
        link: function(scope, elm, attr) {

            $log.log('attr is ', attr);

            var ck = CKEDITOR.replace(elm[0], {
                height: attr['ckheight'],
                language: 'zh-cn'
            });

            ck.on('instanceReady', function() {
                ck.setData(scope.$apply('content'));
                scope.$watch('content', function(newContent) {
                    if (newContent !== ck.getData()) {
                        $log.log('content changed, "', newContent, '"');
                        ck.setData(newContent);
                    }
                });

                ck.on('change', updateModel);
                ck.on('key', updateModel);

            });


            function updateModel() {
                scope.$apply(function() {
                    scope.content = ck.getData();
                });
            }
        }
    };
});