var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context("./static/", true, /\.(jpe?g|gif|png|svg)/));
importAll(require.context("./static/", true, /\.(woff|otf|ttf|eot)/));

importAll(require.context("./static/BEM/", true, /\.(styl|css)/));