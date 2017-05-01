define(function(require, exports) {

  var shanghaiMap = {
    '黄浦区':['南京东路街道','外滩街道','半淞园路街道','小东门街道','豫园街道','老西门街道','五里桥街道','打浦桥街道','淮海中路街道','瑞金二路街道'],
    '徐汇区':['天平路街道','湖南路街道','斜土路街道','枫林路街道','长桥街道','田林街道','虹梅路街道','康健新村街道','徐家汇街道','凌云路街道','龙华街道','漕河泾街道','华泾镇','漕河泾新兴技术开发区'],
    '长宁区':['华阳路街道','江苏路街道','新华路街道','周家桥街道','天山路街道','仙霞新村街道','虹桥街道','程家桥街道','北新泾街道','新泾镇'],
    '静安区':['江宁路街道','石门二路街道','南京西路街道','静安寺街道','曹家渡街道'],
    '普陀区':['曹杨新村街道','长风新村街道','长寿路街道','甘泉路街道','石泉路街道','宜川路道','真如镇','长征镇','桃浦镇'],
    '闸北区':['天目西路街道','北站街道','宝山路街道','共和新路街道','大宁路街道','彭浦新村街道','临汾路街道','芷江西路街道','彭浦镇'],
    '虹口区':['欧阳路街道','曲阳路街道','广中路街道','嘉兴路街道','凉城新村街道','四川北路街道','提篮桥街道','江湾镇街道'],
    '杨浦区':['定海路街道','平凉路街道','江浦路街道','四平路街道','控江路街道','长白新村街道','延吉新村街道','殷行街道','大桥街道','五角场街道','新江湾城街道','五角场镇'],
    '闵行区':['江川路街道','古美街道','新虹街道','莘庄镇','七宝镇','颛桥镇','华漕镇','虹桥镇','梅陇镇','吴泾镇','马桥镇','浦江镇','莘庄工业区'],
    '宝山区':['友谊路街道','吴淞街道','张庙街道','罗店镇','大场镇','杨行镇','月浦镇','罗泾镇','顾村镇','高境镇','庙行镇','淞南镇','宝山城市工业园区'],
    '嘉定区':['新成路街道','真新街道','菊园新区管委会','嘉定镇街道','南翔镇','安亭镇','马陆镇','徐行镇','华亭镇','外冈镇','江桥镇','嘉定工业区'],
    '浦东新区':['潍坊新村街道','陆家嘴街道','周家渡街道','塘桥街道','上钢新村街道','南码头路街道','沪东新村街道','金杨新村街道','洋泾街道','浦兴路街道','东明路街道','花木街道','申港街道','川沙新镇','高桥镇','北蔡镇','合庆镇','唐镇','曹路镇','金桥镇','高行镇','高东镇','张江镇','三林镇','惠南镇','周浦镇','新场镇','大团镇','芦潮港镇','康桥镇','航头镇','六灶镇','祝桥镇','泥城镇','宣桥镇','书院镇','万祥镇','老港镇','芦潮港农场','东海农场','朝阳农场','外高桥保税区','金桥出口加工区','张江高科技园区'],
    '金山区':['石化街道','朱泾镇','枫泾镇','张堰镇','亭林镇','吕巷镇','廊下镇','金山卫镇','漕泾镇','山阳镇'],
    '松江区':['岳阳街道','永丰街道','方松街道','中山街道','泗泾镇','佘山镇','车墩镇','新桥镇','洞泾镇','九亭镇','泖港镇','石湖荡镇','新浜镇','叶榭镇','小昆山镇','松江工业区'],
    '青浦区':['夏阳街道','盈浦街道','香花桥街道','朱家角镇','练塘镇','金泽镇','赵巷镇','徐泾镇','华新镇','重固镇','白鹤镇'],
    '奉贤区':['南桥镇','奉城镇','庄行镇','金汇镇','四团镇','青村镇','柘林镇','海湾镇','上海工业综合开发区','临海社区','上海市奉贤区海湾旅游区','奉贤区现代农业园区', '上海海港综合经济开发区'],
    '崇明区':['城桥镇','堡镇','新河镇','庙镇','竖新镇','向化镇','三星镇','港沿镇','中兴镇','陈家镇','绿华镇','港西镇','建设镇','新海镇','东平镇','长兴镇','新村乡','横沙乡','前卫农场','东平林场','上实现代农业园区']
  };

  exports.render = function(tpl, quiz) {
    var isDebug = $.deparam.querystring()['debug'];
    var userTpl = $('#register');
    var content = tpl(quiz);

    $('#content').html(content);
    $('.header-title').text('');
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

    $('[name="shanghai-district"]').html(_.chain(shanghaiMap).keys().map(function(district){
      return '<option value="'+district+'">'+district+'</option>';
    }).value());

    $('[name="shanghai-street"]').html(_.map(_.values(shanghaiMap)[0], function(street){
      return '<option value="'+street+'">'+street+'</option>';
    }));

    $('[name="shanghai-district"]').on('change', function() {
        //console.log($(this).val());
        var selectedDistrict = $(this).val();
        var streets = shanghaiMap[selectedDistrict];
        $('[name="shanghai-street"]').html(_.map(streets, function(street){
          return '<option value="'+street+'">'+street+'</option>';
        }));        
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
