var Encore = require('@symfony/webpack-encore');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('web/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')
    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    .addEntry('animate', './assets/js/animate.js')
    .addEntry('contact', './assets/js/contact.js')
    .addEntry('font-awesome.min', './assets/js/font-awesome.min.js')
    .addEntry('gmaps', './assets/js/gmaps.js')
    .addEntry('html5shiv', './assets/js/html5shiv.js')
    .addEntry('jquery', './assets/js/jquery.js')
    .addEntry('jquery.prettyPhoto', './assets/js/jquery.prettyPhoto.js')
    .addEntry('jquery.scrollUp.min', './assets/js/jquery.scrollUp.min.js')
    .addEntry('main', './assets/js/main.js')
    .addEntry('prettyPhoto', './assets/js/prettyPhoto.js')
    .addEntry('price-range', './assets/js/price-range.js')
    .addEntry('responsive', './assets/js/responsive.js')
    .addEntry('footer', './assets/js/footer.js')


    //.addEntry('page1', './assets/js/page1.js')
    //.addEntry('page2', './assets/js/page2.js')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use Sass/SCSS files
    //.enableSassLoader()

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();