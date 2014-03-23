define(function(require, exports) {
    exports.render = function(tpl, quiz) {
        var userTpl = $('#register');
        var content = tpl(quiz);
        $('#content').html(content);

        $('.register-wrapper input').on('keydown', function(e) {
            var key = e.which;
            if (key == 13) {
                console.log('Enter is clicked.');
                e.preventDefault();
            }
        });

        $('.capcha-image, .capcha-change-btn').on('click', function() {
            console.log('click capcha image.');
            var capSrc = $('.capcha-image').attr('src');
            $('.capcha-image').attr('src', capSrc);
        });

        $('#submitBtn').on('click', function() {
            var formArray = $('form').serializeArray();
            var formJson = _.object(_.map(formArray, function(el) {
                return el['name'];
            }), _.map(formArray, function(el) {
                return el['value'];
            }));
            //do validation;
            if (validate(formJson)) {
                //do submit;
                submitForm(formJson).then(function(result) {
                    window.location.hash = 'stage=question';
                })['catch'](function(error) {
                    alert('错误:' + error.message);
                });
            }
        });

        function validate(formJson) {
            var result = true;
            var errorMsg = '';
            var fieldDefMap = _.object(_.map(quiz.formFields, function(el) {
                return el.type;
            }), quiz.formFields);
            fieldDefMap['capcha'] = {
                required: true,
                name: '验证码'
            };

            _.each(_.keys(formJson), function(key) {
                if (!key || !fieldDefMap[key]) {
                    return;
                }
                var fieldDef = fieldDefMap[key];
                var fieldValue = formJson[key];
                //check required field
                if (fieldDef.required && !fieldValue) {
                    errorMsg += ('错误 - ' + fieldDef.name + ' 必填. \n');
                }
                //check telephone

                //check others

                //TODO add jquery validation http://jquery.bassistance.de/validate/demo/
            });
            if (errorMsg) {
                result = false;
                alert(errorMsg);
            }
            return result;
        }



        function submitForm(formJson) {
            return new Promise(function(resolve, reject) {
                $.ajax({
                    type: 'POST',
                    url: '/quiz/mvc/user/register',
                    data: JSON.stringify(formJson),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function(result) {
                        if (result.status === 'SUCCESS') {
                            resolve(result);
                        } else {
                            reject(Error(result.message));
                        }
                    }
                }).fail(function(error) {
                    reject(error);
                });
            });
        }
    };

});