module.exports = {
  testURL: 'http://localhost:8881',
  // testURL:'http://10.0.50.101:8080',
  preset: 'jest-puppeteer',
  extraSetupFiles: ['./tests/setupTests.js'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false, // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
}
