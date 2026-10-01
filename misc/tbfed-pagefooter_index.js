var moment = require('moment');
module.exports = {
  book: {
    assets: './assets',
    css: [
      'footer.css'
    ],
  },
  hooks: {
    'page:before': function(page) {
      var _label = 'File Modify: ',
          _format = 'YYYY-MM-DD HH:mm:ss',
          _copy = ''
      if(this.options.pluginsConfig['tbfed-pagefooter']) {
        _label = this.options.pluginsConfig['tbfed-pagefooter']['modify_label'] || '';
        _format = this.options.pluginsConfig['tbfed-pagefooter']['modify_format'] || '';

        var _c = this.options.pluginsConfig['tbfed-pagefooter']['copyright'];
        _copy = _c ? _c + ' all right reserved' + _copy : _copy;
      }
      var _copy = '<span class="copyright">'+_copy+'</span>';
      var str = ' \n\n<footer class="page-footer">' + _copy +
                '</footer>';

      var strComment = '\n\n<script src="https://cdn.jsdelivr.net/npm/twikoo@2.0.12/dist/twikoo.all.min.js"></script>' +
      '\n\n<div id="twikoo" class="twikoo"></div>' +
      '\n\n<script>twikoo.init({envId: "blog-d3gu9b4oo05897e3f"})</script>';

      page.content = page.content + strComment + str;
      return page;
    }
  },
  filters: {
    date: function(d, format) {
      return moment(d).format(format)
    }
  }
};
