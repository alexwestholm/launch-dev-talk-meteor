// utility to DRY up boilerplate around
// authorization predicates
function checkByUser(ctx, cb){
  if(Meteor.user()){
    var uid = Meteor.user().profile.username;
    return cb(ctx, uid);
  }
}

// build the mongo query for the primary company
// list, including searching.
function buildQuery(user, search_term){
  // default is to show only published items
  var query = {published: true};
  // if logged in...
  if(user){
    // ...and user is an admin, show everything
    if(_.contains(Admins, user.profile.username))
      query = {};
    // ...and user is not an admin,
    // show unpublished items user owns as well
    else
      query = {$or: [
        {published: true},
        {owner: user.profile.username}]};
  }
  // add search if term in session
  if(search_term)
    query = {$and: [query,
      {$or: [
        {name: {$regex: search_term}},
        {url: {$regex: search_term}},
        {founders: {$regex: search_term}},
        {description: {$regex: search_term}},
        {tags: {$regex: search_term}}
      ]}]};
  return query;
}

Meteor.subscribe("companies");

Template.companies.helpers({
  'search_term': function(){
    return Session.get("search_term");
  },
  'canManage': function(){
    return checkByUser(this, function(ctx, uid){
      return (uid == ctx.owner || _.contains(Admins, uid));
    });
  },
  'publishable': function(){
    return checkByUser(this, function(ctx, uid){
      return (ctx.published == false && _.contains(Admins, uid));
    });
  },
  'companies': function(){
    // insecure - client can edit profile by default
    // enabling them to pass admin checks
    // ...easy to lock down, though.
    var query = buildQuery(Meteor.user(),
      Session.get("search_term"));
    return Companies.find(query);
  }
});

Template.companies.events({
  'click .delete': function(e){
    e.preventDefault();
    Meteor.call("removeCompany", this._id);
  },
  'click .publish': function(e){
    e.preventDefault();
    Meteor.call("publishCompany", this._id);
  },
  'click #clear-search': function(e){
    e.preventDefault();
    Session.set("search_term", undefined);
  }
});
