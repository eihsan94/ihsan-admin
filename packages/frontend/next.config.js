const i18n = {
  locales: [
    'en',
    'ja',
    'zh-Hans',
    'zh-Hant',
    'ko',
    'es',
    'fr',
    'de',
    'ru',
    'pt',
    'pt-br',
  ],
  defaultLocale: 'en',
  localeDetection: false,
}
const withTM = require("next-transpile-modules")(["lib"]);

module.exports = withTM({
  reactStrictMode: true,
  i18n,
})
