Router.route("home", {
  path: "/",
  layout: "master",
  template: "home"
});

Router.route("add", {
  path: "/add",
  layout: "master",
  template: "add",
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.next();
    } else {
      Meteor.loginWithGithub({requestPermissions: ['user']});
    }
  }
});
