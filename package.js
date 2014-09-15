Package.describe({
  summary: "In app url shortener."
});

Package.on_use(function (api) {
  if (api.versionsFrom)
    api.use(['iron:router', 'underscore'], ['client', 'server']);
  else
    api.use(['iron-router', 'underscore'], ['client', 'server']);

  api.add_files('url-shortener-common.js', ['client', 'server']);
  api.add_files('url-shortener-client.js', 'client');
  api.add_files('url-shortener-server.js', 'server');

  api.export('UrlShortener');
});
