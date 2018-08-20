Example for development and production configuraitons.

Install webpack locally to the project folder after cloning git project.

Install the following packages:
webpack-dev-server,
webpack-cli,
html-webpack-plugin,
mini-css-extract-plugin,
clean-webpack-plugin,
style-loader,
css-loader,
postcss-clean,
postcss-loader,
sass-loader,
node-sass,
babel-core,
babel-loader,
babel-preset-env

Source files are in src folder.
index.js contains imports for common styles.
ie.js contains import(s) for separate css bundle for IE. It's included to index.html with conditional comments.

Source maps can be added/removed by adding/removing 'devtool: "source-map"' in the config file.
Minificaiton of css is added using postcss-loader with postcss-clean plugin.
