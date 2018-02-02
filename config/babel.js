module.exports = {
  babelrc: false,
  presets: [
    [
      'babel-preset-env',
      {
        loose: true,
        uglify: true,
        modules: false, 
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'IE >= 9']
        },
        exclude: ['transform-regenerator', 'transform-es2015-typeof-symbol']
      }
    ],
    'stage-0'
  ],
  plugins: [
    'babel-plugin-transform-object-assign',
    'babel-plugin-transform-decorators-legacy',
    ['babel-plugin-transform-react-jsx', { pragma: 'h' }]
  ]
};