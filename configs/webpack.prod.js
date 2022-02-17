const { default: merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizePlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, args) => {
	const commonConfig = common(env, args);

	/** @type {import("webpack").Configuration} */
	const prod = {
		mode: "production",

		devtool: false,
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						mangle: {
							safari10: true,
						},
						compress: { drop_console: true },
					},
				}),
				new CssMinimizePlugin(),
			],
		},

		plugins: [
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: true,
			}),
		],
	};

	return merge(commonConfig, prod);
};
