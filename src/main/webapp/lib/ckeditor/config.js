/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  // config.uiColor = '#9AB8F3'; 
  // config.height = 450;

  config.extraPlugins = config.extraPlugins + (config.extraPlugins ? ',lineheight' : 'lineheight');
  // alert(config.extraPlugins);
  //
  // Remove some buttons, provided by the standard plugins, which we don't
  // need to have in the Standard(s) toolbar.

  config.allowedContent = true; //not allow tag filtering

  // config.toolbar_MyToolbar = [

  //   ['Paste', 'PasteText', 'PasteFromWord'],
  //   ['Image', 'Flash', 'Table', 'PageBreak', 'HorizontalRule'],
  //   ['Bold', 'Italic', 'Strike'],
  //   ['Outdent', 'Indent'],
  //   ['Link', 'Unlink', 'Anchor'],
  //   ['TextColor', 'BGColor'],
  //   ['Styles', 'Format', 'Font', 'FontSize', 'lineheight'],
  //   ['Source']

  // ];
};