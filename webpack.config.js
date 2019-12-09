const path = require('path');
const merge = require('webpack-merge');

const folder = path.join(__dirname);

const base = require('./webpackAdds/base.js');
const babel = require('./webpackAdds/babel.js');
const pug = require('./webpackAdds/pug.js');
const stylus = require('./webpackAdds/stylus.js');
const statics = require('./webpackAdds/statics.js');
const aliases = require('./webpackAdds/aliases.js');

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
