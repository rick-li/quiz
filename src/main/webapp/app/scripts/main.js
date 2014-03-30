require.config({
    base_url: 'quiz/app/scripts',
    paths: {
        'jquery': '../lib/jquery.min',
        'jquery.ui.core': '../lib/jquery.ui.core',
        'datepicker': '../lib/jquery.ui.datepicker',
        'bbq': '../lib/jquery.ba-bbq.min',
        'jquery-migrate': '../lib/jquery-migrate-1.2.1',
        'underscore': '../lib/underscore-min',
        'text': '../lib/text'
    },
    shim: {
        'jquery-migrate': ['jquery'],
        'bbq': ['jquery', 'jquery-migrate'],
        'jquery.ui.core': ['jquery'],
        'datepicker': ['jquery.ui.core'],
        'app': ['bbq', 'text', 'underscore', 'datepicker']
    },
    deps: ['app']
});