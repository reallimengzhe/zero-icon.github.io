const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  css: {
    // 不提取 CSS
    extract: false,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#000000"
          },
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: "./",
  assetsDir: "static",
  outputDir: "docs",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("examples")
      }
    }
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    // config.module
    //   .rule("js")
    //   .include.add("/packages")
    //   .end()
    //   .use("babel")
    //   .loader("babel-loader")
    //   .tap(options => {
    //     // 修改它的选项...
    //     return options;
    //   });
  },
  devServer: {
    port: 9877
  }
};
