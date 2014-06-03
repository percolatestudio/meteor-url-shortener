UrlShortener = {
  options: {
    collection: new Meteor.Collection('shortUrls')
  }
}

Meteor.methods({
  'url-shortener/shorten': function(path) {
    check(path, String);
    return UrlShortener.options.collection.insert({path: path});
  }
});

Router.map(function() {
  this.route('urlShortener', {
    where: 'server',
    path: '/:id',
    action: function() {
      //XXX: check host headers if we want to make sure user is requesting
      //the short url
      var url = UrlShortener.options.collection.findOne({_id: this.params.id});

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
