/**
 * Bootstrap configuration for bootstrap-sass-loader
 *
 * Scripts are disabled to not load jQuery.
 * If you depend on Bootstrap scripts consider react-bootstrap instead.
 * https://github.com/react-bootstrap/react-bootstrap
 *
 * In order to keep the bundle size low in production
 * disable components you don't use.
 *
 */

module.exports = {
  preBootstrapCustomizations: './src/themes/pre-bootstrap-customization.scss',
  mainSass: './src/themes/bootstrap.overrides.scss',
  verbose: false,
  debug: false,
  scripts: {
    transition: false,
    alert: false,
    button: false,
    carousel: false,
    collapse: false,
    dropdown: false,
    modal: false,
    tooltip: false,
    popover: false,
    scrollspy: false,
    tab: false,
    affix: false
  },
  styles: {
    mixins: true,
    normalize: true,
    print: true,
    glyphicons: false,
    scaffolding: true,
    type: true,
    code: true,
    grid: true,
    tables: true,
    forms: true,
    buttons: true,
    'component-animations': false,
    dropdowns: false,
    'button-groups': false,
    'input-groups': false,
    navs: false,
    navbar: false,
    breadcrumbs: false,
    pagination: false,
    pager: false,
    labels: false,
    badges: false,
    jumbotron: false,
    thumbnails: false,
    alerts: false,
    'progress-bars': false,
    media: true,
    'list-group': false,
    panels: true,
    wells: false,
    'responsive-embed': false,
    close: true,
    modals: false,
    tooltip: false,
    popovers: false,
    carousel: false,
    utilities: true,
    'responsive-utilities': true
  }
}
