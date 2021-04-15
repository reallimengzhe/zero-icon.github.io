module.exports = {
  presets: [
    [
      "@vue/app",
      {
        targets: {
          ie: "11"
        }
      }
    ]
  ],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
};
