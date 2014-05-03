define(function(require, exports) {
  exports.render = function(tpl, quiz) {
    var isDebug = $.deparam.querystring()['debug'];
    var userTpl = $('#register');
    var content = tpl(quiz);

    $('#content').html(content);
    $('.header-title').text(quiz.name);
    $('.register-wrapper input').on('keydown', function(e) {
      var key = e.which;
      if (key == 13) {
        console.log('Enter is clicked.');
        e.preventDefault();
      }
    });
    $('[name=birthday]').attr('readonly', true);
    $('[name=birthday]').datepicker({
      defaultDate: '-10y',
      changeYear: true,
      changeMonth: true
    });

    $('.capcha-image,.capcha-change-btn').on('click', function() {
      if (isDebug) {
        alert('已点击验证码');
      }
      console.log('click capcha image.');
      var capSrc = $('.capcha-image').attr('data-src') + '?' + new Date().getTime();
      $('.capcha-image').attr('src', capSrc);
      if (isDebug) {
        alert('已重载验证码');
      }
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
        }).fail(function(error) {
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

      result = validatePhone();

      return result;
    }

    function validatePhone() {
      var num = $('input[name=phonenum]').val();

      if (num.length == 11) {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(num))) {
          alert("不是正确的手机号");
          $('input[name=phonenum]').focus();
          return false;
        }
      } else if (num.length == 8) {
        if (!/^\d{8}$/.test(num)) {
          alert("不是正确的电话号码");
          $('input[name=phonenum]').focus();
          return false;
        }
      } else {
        alert("不是正确的电话号码");
        $('input[name=phonenum]').focus();
        return false;
      }

      return true;
    }

    function submitForm(formJson) {
      var defer = $.Deferred();

      formJson.quizCode = $.deparam.querystring()['quiz'];
      var data = JSON.stringify(formJson);
      console.log('submitting ' + data);
      $.ajax({
        type: 'POST',
        url: '/quiz/mvc/user/register',
        data: data,
        contentType: 'application/json',
        dataType: 'json',
        success: function(result) {
          if (result.status === 'SUCCESS') {
            defer.resolve(result);
          } else {
            defer.reject(Error(result.message));
          }
        }
      }).fail(function(error) {
        defer.reject(error);
      });
      return defer;
    }
  };

});