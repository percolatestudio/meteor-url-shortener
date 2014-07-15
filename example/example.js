if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to example.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    UrlShortener.options.prefix = 'short.co';
    
    console.log('Short for foo-bar:' + UrlShortener.shorten('foo-bar'));
  });
}

Router.map(function() {
  this.route('hello', {path: '/'});
});
