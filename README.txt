/* NPM setup */

npm init

npm install react react-dom

npm install axios

npm install -D tailwindcss postcss postcss-loader autoprefixer
npx tailwindcss init -p

/* update the taiwind config and postcss config file */

/* copy below to tailwind.config.js file */

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* copy below to postcss.config.js file

module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};


/* for scss support */

npm install sass --save-dev
npm install css-loader sass-loader --save-dev


/* for typescript support */

npm install -D typescript@4.7.4 ts-loader @types/node @types/react @types/react-dom

type nul > tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "allowJs": true,
    "jsx": "react",
    "sourceMap": true,
    "outDir": "./dist/",
    "strict": true,
    "moduleResolution": "Node",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    },
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}




/* Make Folder Structure */

mkdir public

mkdir src

mkdir src/assets
mkdir src/assets/images
mkdir src/assets/styles

mkdir src/components
mkdir src/features
mkdir src/pages
mkdir src/types
mkdir src/sevices
mkdir src/stores
mkdir src/utils
mkdir src/hooks



/* Add files */

type nul > public/index.html

type nul > src/index.tsx
type nul > src/App.tsx

type nul > src/assets/styles/index.scss

type nul > src/global.d.ts


/* copy below to global.d.ts file */

declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.svg';


/* Edit Files to add codes in index.tsx, src/assets/styles/index.scss, App.tsx, global.d.ts */

/* copy below to index.tsx file */

import React from 'react';
import App from './App';
import './assets/styles/index.scss';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);


/* copy below to App.tsx file */

import React from 'react';

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  );
};

export default App;


/* copy below to assets/styles/index.scss file */

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";


/* Webpack Setup */


npm install -D webpack webpack-cli webpack-dev-server
npm install html-webpack-plugin --save-dev
npm install mini-css-extract-plugin --save-dev
npm install compression-webpack-plugin --save-dev 
npm install webpack-merge --save-dev

type nul > webpack.common.js
type nul > webpack.dev.js
type nul > webpack.prod.js

/* edit the webpack files common, dev, prod */

/* copy below to webpack.common.js file */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.pdf/,
        type: "asset/resource",
        generator: {
          filename: "assets/pdfs/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext][query]",
        },
      },
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "index.[id].css",
    }),
    new CompressionPlugin(),
  ],
};



/* copy below to webpack.dev.js file */

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
});



/* copy below to webpack.prod.js file */

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
});




/* babel */

npm install @babel/core babel-loader --save-dev
npm install @babel/preset-env @babel/preset-react --save-dev

type nul > .babelrc

/* copy below to .babelrc file */

{
  "presets": ["@babel/preset-env"]
}


/* update package.json scripts */

"start": "webpack serve --config webpack.dev.js --open",
"dev": "rimraf dist && webpack --config webpack.dev.js",
"build": "rimraf dist && webpack --config webpack.prod.js"
"lint": "eslint .",
"lint:fix": "eslint --fix ."


/* ESLint , Prettier, Husky, lint-staged, pretty-quick */

npm install eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-react  --save-dev

npm install -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react-hooks

npm init @eslint/config

/* copy below to .eslintrc.json file */

{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["react", "@typescript-eslint", "react-hooks", "prettier"],
  "rules": {
    "quotes": ["error", "double", { "avoidEscape": true }],
    "@typescript-eslint/quotes": ["error", "double", { "avoidEscape": true }],
    "react/jsx-uses-react": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "import/extensions": ["off"],
    "no-param-reassign": ["error", { "props": false }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  }
}

type nul > .prettierrc

/* copy below to .prettierrc file */

{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSameLine": true
}

type nul > .prettierignore
type nul > .eslintignore

/* copy below to both these files */

node_modules
dist
webpack.*.js




/* Git setup */

type nul > .gitignore

/* copy below to .gitignore file */

node_modules
dist

/* open gitignore and add node_modules and dist folder to it */

git init

git add .

git commit -m 'Initial Commit'


/* Intall Husky  */

npm install husky lint-staged pretty-quick --save-dev

npx husky install

type nul > .husky/pre-commit

/* copy below to the file */

#!/usr/bin/env sh
npx lint-staged
npx pretty-quick --staged

/* check if lint is working */


