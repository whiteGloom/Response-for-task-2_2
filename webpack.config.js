const path = require('path');
const merge = require('webpack-merge');

const folder = path.join(__dirname);

const babel = require('./webpackAdds/vendors/babel.js');
const pug = require('./webpackAdds/vendors/pug.js');
const stylus = require('./webpackAdds/vendors/stylus.js');
const statics = require('./webpackAdds/vendors/statics.js');
const aliases = require('./webpackAdds/vendors/aliases.js');
const base = require('./webpackAdds/base.js');

function config() {
  return merge([
    base({ base: folder }),
    babel(),
    pug({ base: folder }),
    stylus(),
    statics(),
    aliases({ base: folder }),
  ]);
}

module.exports = config;
