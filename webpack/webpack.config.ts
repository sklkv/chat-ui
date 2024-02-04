import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: Configuration = {
	mode:
    (process.env.NODE_ENV as "production" | "development" | undefined) ??
    "development",
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /.ts(x)?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@app": path.resolve(__dirname, "../src/app"),
			"@entities": path.resolve(__dirname, "../src/entities"),
			"@features": path.resolve(__dirname, "../src/features"),
			"@pages": path.resolve(__dirname, "../src/pages"),
			"@shared": path.resolve(__dirname, "../src/shared"),
			"@widgets": path.resolve(__dirname, "../src/widgets"),
		},
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: "public" }],
		}),
	],
};

export default config;
