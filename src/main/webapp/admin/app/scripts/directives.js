app.directive('datatable', function($log, $parse, $timeout) {
    var dataTable;
    var initTable = function(element, columns, content) {
        content
        var options = {
            aoColumns: columns,
            aaData: content
        };
        dataTable = element.dataTable(options);
    };
    return {
        restrict: 'E',
        scope: {
            columns: '=',
            content: '=',
            ondelete: '&'
        },
        replace: true,

        template: function(element, attrs) {
            var strVar = "";
            strVar += "<table class='datatable table table-striped table-bordered'>";
            strVar += "<\/table>";
            return strVar;
        },

        link: function(scope, element, attrs) {
            $log.log('attrs: ', attrs);
            var deleteFn = $parse(attrs['delete']);
            $log.log(scope);
            $log.log('Delete fn is ', deleteFn);
            var columns = scope.columns;

            scope.$watch('content', function(content) {
                $log.log('content is ', scope.content);
                if (scope.content) {
                    if (!scope.inited) {
                        initTable(element, columns, content);
                        // $log.log('Delete btns are: ', element.find('.btn-delete'));

                        scope.inited = true;
                        element.delegate('.btn-delete', 'click', function(e) {
                            // console.log('clicked ', $(e.currentTarget).attr('qid'));
                            // var row = element.find('tr').has($(e.currentTarget));

                            var qid = $(e.currentTarget).attr('qid');
                            scope.ondelete({
                                qid: qid
                            });
                        });
                    }


                }
            });
        }
    };
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