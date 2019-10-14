const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, 'dst'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", "*"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/env", "@babel/react"]
                    }
                }
            }
        ]
    },
    devtool: "eval-source-map"
};
