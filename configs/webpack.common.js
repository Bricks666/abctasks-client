const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePlugin = require("case-sensitive-paths-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const paths = require("./paths");

const assetsReg = /\.(svg|png|j(e?)pg)$/;

const plugins = (isDev) => [
	new HtmlWebpackPlugin({
		template: path.join(paths.public, "index.html"),
		minify: isDev
			? false
			: {
					removeComments: true,
					collapseWhitespace: true,
					removeScriptTypeAttributes: true,
			  },
	}),
	new MinCssExtractPlugin(),
	new CaseSensitivePlugin(),
];

const rules = (isDev) => [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: ["babel-loader"],
	},
	{
		test: /\.ts(x?)$/,
		exclude: [/node_modules/, /mocks/],
		use: [
			"babel-loader",
			{
				loader: "ts-loader",
				options: {
					configFile: path.join(paths.root, "tsconfig.json"),
				},
			},
		],
	},
	{
		test: assetsReg,
		type: "asset/resource",
	},
	{
		test: /\.css$/,
		use: [
			{
				loader: isDev ? "style-loader" : MinCssExtractPlugin.loader,
			},
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: /\.module\.\w+$/,
						localIdentName: isDev ? "[name]__[local]--[hash]" : "[hash:base64]",
					},
				},
			},
			{
				loader: "postcss-loader",
			},
		],
	},
];

module.exports = (_, args) => {
	const isDev = args.mode === "development" || false;

	/** @type {import('webpack').Configuration} */
	const config = {
		entry: path.join(paths.src, "index.tsx"),
		output: {
			path: paths.build,
			filename: "[name].js",
			publicPath: "/",
			chunkFilename: "[name].js",
			clean: true,
		},
		resolve: {
			plugins: [
				new TsconfigPathsPlugin({
					configFile: path.join(paths.root, "tsconfig.json"),
				}),
			],
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
		externals: "/node_modules/",
		module: {
			rules: rules(isDev),
		},
		plugins: plugins(isDev),
	};
	return config;
};
