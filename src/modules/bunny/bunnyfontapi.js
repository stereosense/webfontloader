goog.provide('webfont.modules.bunny.BunnyFontApi');

goog.require('webfont.modules.bunny.FontApiUrlBuilder');
goog.require('webfont.modules.bunny.FontApiParser');
goog.require('webfont.FontWatchRunner');
goog.require('webfont.StyleSheetWaiter');

/**
 * @constructor
 * @implements {webfont.FontModule}
 */
webfont.modules.bunny.BunnyFontApi = function(domHelper, configuration) {
  this.domHelper_ = domHelper;
  this.configuration_ = configuration;
};

/**
 * @const
 * @type {string}
 */
webfont.modules.bunny.BunnyFontApi.NAME = 'bunnyfonts';

goog.scope(function () {
  var BunnyFontApi = webfont.modules.bunny.BunnyFontApi,
      FontWatchRunner = webfont.FontWatchRunner,
      StyleSheetWaiter = webfont.StyleSheetWaiter,
      FontApiUrlBuilder = webfont.modules.bunny.FontApiUrlBuilder,
      FontApiParser = webfont.modules.bunny.FontApiParser;

  BunnyFontApi.METRICS_COMPATIBLE_FONTS = {
    "Arimo": true,
    "Cousine": true,
    "Tinos": true
  };

  BunnyFontApi.prototype.load = function(onReady) {
    var waiter = new StyleSheetWaiter();
    var domHelper = this.domHelper_;
    var fontApiUrlBuilder = new FontApiUrlBuilder(
        this.configuration_['api'],
        this.configuration_['text']
    );
    var fontFamilies = this.configuration_['families'];
    fontApiUrlBuilder.setFontFamilies(fontFamilies);

    var fontApiParser = new FontApiParser(fontFamilies);
    fontApiParser.parse();

    domHelper.loadStylesheet(fontApiUrlBuilder.build(), waiter.startWaitingLoad());
    waiter.waitWhileNeededThen(function() {
      onReady(fontApiParser.getFonts(), fontApiParser.getFontTestStrings(), BunnyFontApi.METRICS_COMPATIBLE_FONTS);
    });
  };
});
