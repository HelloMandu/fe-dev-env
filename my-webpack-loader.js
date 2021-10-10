module.exports = function myWebpackLoader(content){
  console.log('My Webpack Loader');
  return content.replaceAll('console.log', 'alert');
}