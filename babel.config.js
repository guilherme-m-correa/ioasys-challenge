module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers' : './src/controllers',
        '@config' : './src/config',
        '@validators' : './src/validators',
        '@errors' : './src/errors',
        '@entities' : './src/entities',
        '@middlewares' : './src/middlewares',
        '@providers' : './src/providers',
        '@repositories' : './src/repositories',
        '@factories' : './src/factories',
        '@services' : './src/services',
        '@contracts' : './src/contracts',
        '@dtos' : './src/dtos',
        '@utils' : './src/utils',
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ]
}
