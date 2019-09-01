const path = require("path");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "../../Public/Js/React"),
        filename: "bundle.js",
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
            }
        ]
    }
};
///sudo rm -R /home/SOY/View/webpack-react-build/src && sudo cp -r /home/SOY/View/webpack-react/src /home/SOY/View/webpack-react-build/src