Template.home.events({
  'click #login': function(e){
    e.preventDefault();
    Meteor.loginWithGithub({requestPermissions: ['user']});
  },
  'click #search button': function(e){
    e.preventDefault();
    var term = document.getElementById("search-term");
    Session.set("search_term", term.value);
    term.value = '';
  },
});
