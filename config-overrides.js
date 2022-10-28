const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    addWebpackAlias,
    adjustWorkbox,
    addWebpackExternals
  } = require("customize-cra");
  const path = require("path");
  const addLessLoader = require("customize-cra-less-loader");
  
  module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
  
    // disable eslint in webpack
    disableEsLint(),
  
    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
  
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
      ["@"]: path.resolve(__dirname, "src")
    }),
  
    // adjust the underlying workbox
    adjustWorkbox(wb =>
      Object.assign(wb, {
        skipWaiting: true,
        exclude: (wb.exclude || []).concat("index.html")
      })
    ),
    addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#2249C0',
            'link-color': '#2249C0',
            'success-color': '#21b58c',
            'warning-color':'#FFAB04',
            'error-color':'#e31818',
            'font-size-base':'14px',
            'heading-color':'#626E85',
            'text-color':'#111830',
            'text-color-secondary':'#f3A4861',
            'disabled-color':'#d9d9d9',
            'border-radius-base':'2px',
            'border-color-base':'#d9d9d9'
          }
        },
      }),
      addWebpackExternals({
        react: "React",
        "react-dom": "ReactDOM"
      }),
  );