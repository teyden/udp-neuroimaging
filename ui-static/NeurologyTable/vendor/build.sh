NODE_ENV=production browserify -t envify -g uglifyify deps.js > bundle.js
