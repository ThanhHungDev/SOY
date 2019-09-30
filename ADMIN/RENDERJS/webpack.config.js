const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/../../SERVER/Public/Js/React"),
        filename: "admin.js",
        publicPath: '/',
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
            },
			{ 
				test: /\.(jpg|png)$/, 
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                    publicPath: 'Js/React',
                },
			}
        ]
    }
};