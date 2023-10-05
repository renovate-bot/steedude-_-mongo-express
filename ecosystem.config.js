module.exports = {
  apps: [
    {
      name: 'mongo-express',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
