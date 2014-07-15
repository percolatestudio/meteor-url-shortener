UrlShortener = {
  // joins arguments together and turns multiple /'s into a single /
  _join: function() {
    return Array.prototype.slice.call(arguments).join('///')
                                                .replace(/\/\/\/+/g, '/');
  }
}
