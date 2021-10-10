module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79", // 크롬 79까지 지원하는 코드를 만든다
          ie: "11", // ie 11까지 지원하는 코드를 만든다
        },
      },
    ],
  ],
}