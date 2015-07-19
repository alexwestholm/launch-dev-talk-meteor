function addToCollection(col, id){
  var div = document.getElementById(id);
  col.insert({value: div.value});
  div.value = '';
}

function buildCompany(){
  var names = Names.find({});
  var logo = Session.get("logo");
  var tags = Tags.find({});
  var getValues = function(e){ return e.value; };
  return {
    name: document.getElementById("cname").value,
    url: document.getElementById("url").value,
    founders: names.map(getValues),
    logo: logo,
    description: document.getElementById("description").value,
    tags: tags.map(getValues)
  };
}

Names = new Meteor.Collection(null);
Tags = new Meteor.Collection(null);

Template.add.onRendered(function(){
  Session.set("logo",'');
});

Template.add.helpers({
  logo: function(){
    return Session.get("logo");
  },
  names: function(){
    return Names.find({});
  },
  tags: function(){
    return Tags.find({});
  },
});

Template.add.events({
  'click #team-btn': function(e){
    e.preventDefault();
    addToCollection(Names, "names");
  },
  'click #logo-btn': function(e){
    e.preventDefault();
    Session.set("logo",
      document.getElementById("logo").value);
    document.getElementById("logo").value = '';
  },
  'click #tag-btn': function(e){
    e.preventDefault();
    addToCollection(Tags, "tags");
  },
  'click #add-startup': function(e){
    e.preventDefault();
    Meteor.call("saveCompany", buildCompany());
    Router.go("home");
  }
});
