const withPlugins = require("next-compose-plugins");
const withFonts = require("next-fonts");
const withImages = require("next-images");

module.exports = withPlugins([withImages, withFonts], {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
    quotes: "double",
  },
});
