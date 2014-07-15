// Reactive. Returns a 'long url' from the given path then
// calls a server method to shorten it, returning the short url when it arrives
// caches results in the Session.
UrlShortener.shorten = function(path) {
  var longUrl = UrlShortener._join(Meteor.absoluteUrl(), path);
  var sessionKey = 'url-shortener-' + path;

  var url = Session.get(sessionKey);
  if (url)
    return url;
  
  Meteor.call('url-shortener/shorten', path, function(err, res) {
    if (res)
      Session.set(sessionKey, res);
    else {
      Log.error('Unable to shorten path:' + path);
      Log.error(err);
    }
  });

  // default to the longUrl till we can recieve the short one
  return longUrl;
}
