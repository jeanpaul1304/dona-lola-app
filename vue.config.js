module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/dona-lola/dist/'
    : '/',
  outputDir: '../dona-lola-dist/dona-lola/dist'
}