UrlShortener.options = {
  collection: new Meteor.Collection('shortUrls'),
  prefix: process.env.ROOT_URL, // defaults to the ROOT_URL, user to override,
  idLength: 5 // set to 0/null to use full length id's
}

Meteor.startup(function() {
  UrlShortener.options.collection._ensureIndex({path: 1});
});

// Returns the shortUrl for the given path
UrlShortener.shorten = function(path) {
  return Meteor.call('url-shortener/shorten', path);
}

Meteor.methods({
  // creates a short url from the given path
  'url-shortener/shorten': function(path) {
    check(path, String);

    var doc = UrlShortener.options.collection.findOne({path: path});

    if (doc) {
      var id = doc._id;
    } else {
      var id = UrlShortener.options.collection.insert({
        path: path,
        createdAt: new Date
      });
    }

    if (UrlShortener.options.idLength)
      id = id.slice(0, UrlShortener.options.idLength);

    return UrlShortener._join(UrlShortener.options.prefix, id);
  }
});

Router.map(function() {
  this.route('urlShortener', {
    where: 'server',
    path: '/:id',
    action: function() {
      //XXX: check host headers if we want to make sure user is requesting
      //the short url
      
      if (UrlShortener.options.idLength)
        var query = {_id: {$regex: '^' + this.params.id}};
      else
        var query = {_id: this.params.id};

      var url = UrlShortener.options.collection.findOne(query);

      //XXX: Do we want to 404 or fail differently here?
      if (url) {
        var location = Meteor.absoluteUrl(url.path.replace(/^\//, ''));
        this.response.writeHead(301, {Location: location})
        this.response.end();
      } else {
        this.next();
      }
    }
  })
})
