Meteor.methods({
  saveCompany: function(details){
    var user = Meteor.user().profile.username;
    var doc = _.extend(details,
      {published: false,
      owner: user});
    Companies.insert(doc);
  },
  removeCompany: function(id){
    var user = Meteor.user().profile.username;
    var co = Companies.findOne({_id: id});
    if(co){
      var authd = Admins.concat(co.owner);
      if(authd.indexOf(user) != -1)
        Companies.remove(id);
    }
  },
  publishCompany: function(id){
    var user = Meteor.user().profile.username;
    var co = Companies.findOne({_id: id});
    if(_.contains(Admins, user)){
      Companies.update(id, {$set: {published: true}});
    }
  }
});
