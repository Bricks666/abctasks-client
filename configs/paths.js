const path = require("path");

const root = path.resolve(__dirname, "..");
module.exports = {
	root,
	src: path.join(root, "src"),
	build: path.join(root, "dist"),
	public: path.join(root, "public"),
};
