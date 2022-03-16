const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const { default: merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common");

module.exports = (env, args) => {
	const commonConf = common(env, args);
	/**  @type {import('webpack').Configuration} */
	const extensions = {
		target: "web",
		mode: args.mode || "development",
		devtool: "source-map",
		devServer: {
			static: {
				directory: paths.public,
				publicPath: "/",
			},
			port: 3000,
			open: args.open ?? true,
			historyApiFallback: true,
			compress: true,
			server: "http",
			watchFiles: ["./src/**/*.*"],
			hot: true,
		},

		plugins: [new HotModuleReplacementPlugin()],
	};
	return merge(commonConf, extensions);
};
