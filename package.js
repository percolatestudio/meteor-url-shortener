Package.describe({
  summary: "In app url shortener."
});

Package.on_use(function (api) {
  api.use(['iron-router', 'underscore'], ['client', 'server']);

  // api.add_files(['short-url.js', 'short-url.js'], 'client');
  api.add_files('url-shortener-server.js', 'server');
});