module.exports = function(app) {
  app.get('/', function(req, res, next) { //what to do with the url
    res.send(['hi','bye','sad']);
  });

}
