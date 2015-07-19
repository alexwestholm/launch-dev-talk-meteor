ServiceConfiguration.configurations.upsert(
  {service: "github"},
  {$set: {
    service: "github",
    redirectUri: "http://127.0.0.1/",
    clientId: "8b1bc7133d8483d32833",
    secret: "7bcc9863a359a3fc12071243daded04a4e1f3395"
  }
});

Accounts.onLogin(function(u){
  Meteor.users.update(u.user._id,
    {$set: {'profile.username': u.user.services.github.username}});
});

