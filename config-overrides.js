const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addWebpackExternals,
  overrideDevServer,
  watchAll,
  fixBabelImports,
  // useBabelRc,
} = require("customize-cra");
const path = require("path");
const addLessLoader = require("customize-cra-less-loader");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const addDevServerConfig = () => (config) => {
  return {
    ...config,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
    proxy: {
      // '/unpkg.com':{
      //   target: 'https://unpkg.com/',
      //   changeOrigin: true,
      // },
      '/apis/v1alpha1': {
        target: process.env.REACT_APP_APISERVER,
        changeOrigin: true,
      },
      '/apis/v1': {
        target: process.env.REACT_APP_APISERVER,
        changeOrigin: true,
      },
      '/oauth2': {
        target: process.env.REACT_APP_APISERVER,
        changeOrigin: true,
      },
      '/cvat': {
        target: process.env.REACT_APP_CVAT,
        changeOrigin: true,
      },
    }
  };
};
const rewiredMap = () => (config) => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}
module.exports = {
  webpack: override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // disable eslint in webpack
    disableEsLint(),

    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "src"),
    }),

    // adjust the underlying workbox
    adjustWorkbox((wb) =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html"),
      })
    ),
    addLessLoader({
      cssLoaderOptions: {
        sourceMap: false,
        modules: {
          localIdentName: "[hash:base64:8]",
        },
      },
      lessLoaderOptions: {
        lessOptions: {
          // strictMath: true,
          javascriptEnabled: true,
          modifyVars: {
            "primary-color": "#2249C0",
            "link-color": "#2249C0",
            "success-color": "#21b58c",
            "warning-color": "#FFAB04",
            "error-color": "#e31818",
            "font-size-base": "14px",
            "heading-color": "#626E85",
            "text-color": "#111830",
            "text-color-secondary": "#f3A4861",
            "disabled-color": "#d9d9d9",
            "border-radius-base": "2px",
            "border-color-base": "#d9d9d9",
          },
        },
      },
    }),
    addWebpackExternals({
      react: "React",
      "react-dom": "ReactDOM",
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    }),
    fixBabelImports('otter-pro', {
      libraryName: 'otter-pro',
      libraryDirectory: 'es/components',
      style: true //(module) => `${module}/index.less`,
    }),
    rewiredMap(),
    // useBabelRc(),
    (config) => {
      config.plugins.push(new MonacoWebpackPlugin())
      return config
    },
  ),
  devServer: overrideDevServer(
    // watchAll(), 
    addDevServerConfig()),
};

// const {
//   override,
//   addDecoratorsLegacy,
//   disableEsLint,
//   addBundleVisualizer,
//   addWebpackAlias,
//   adjustWorkbox,
//   addWebpackExternals,
//   overrideDevServer,
//   watchAll,
//   fixBabelImports,
// } = require("customize-cra");
// const path = require("path");
// const addLessLoader = require("customize-cra-less-loader");
// const addDevServerConfig = () => (config) => {
//   return {
//     ...config,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     proxy: {
//       '/unpkg.com':{
//         target: 'https://unpkg.com/',
//         changeOrigin: true,
//       },
//       '/apis/v1alpha1': {
//         target: process.env.REACT_APP_APISERVER,
//         changeOrigin: true,
//       },
//       '/apis/v1': {
//         target: process.env.REACT_APP_APISERVER,
//         changeOrigin: true,
//       },
//       '/oauth2': {
//         target: process.env.REACT_APP_APISERVER,
//         changeOrigin: true,
//       },
//       '/cvat': {
//         target: process.env.REACT_APP_CVAT,
//         changeOrigin: true,
//       },
//     }
//   };
// };
// const rewiredMap = () => (config) => {
//   config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
//   return config
// }
// module.exports = {
//   webpack: override(
//     // enable legacy decorators babel plugin
//     addDecoratorsLegacy(),

//     // disable eslint in webpack
//     disableEsLint(),

//     // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
//     process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

//     // add an alias for "ag-grid-react" imports
//     addWebpackAlias({
//       ["@"]: path.resolve(__dirname, "src"),
//     }),

//     // adjust the underlying workbox
//     adjustWorkbox((wb) =>
//       Object.assign(wb, {
//         skipWaiting: true,
//         exclude: (wb.exclude || []).concat("index.html"),
//       })
//     ),
//     addLessLoader({
//       lessOptions: {
//         javascriptEnabled: true,
//         modifyVars: {
//           "primary-color": "#2249C0",
//           "link-color": "#2249C0",
//           "success-color": "#21b58c",
//           "warning-color": "#FFAB04",
//           "error-color": "#e31818",
//           "font-size-base": "14px",
//           "heading-color": "#626E85",
//           "text-color": "#111830",
//           "text-color-secondary": "#f3A4861",
//           "disabled-color": "#d9d9d9",
//           "border-radius-base": "2px",
//           "border-color-base": "#d9d9d9",
//         },
//       },
//     }),
//     addWebpackExternals({
//       react: "React",
//       "react-dom": "ReactDOM",
//     }),
//     fixBabelImports("import", {
//       libraryName: "antd",
//       libraryDirectory: "es",
//       style: "css",
//     }),
//     rewiredMap()
//   ),
//   devServer: overrideDevServer(watchAll(), addDevServerConfig()),
// };
