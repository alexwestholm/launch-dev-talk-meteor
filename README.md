# launch-dev-talk-meteor

This repo contains slides and code for a presentation to LAUNCH! Dev Talks on July 13th, 2015. The topic: Meteor.

### Slides

Slides are found in `meteor-talk.pdf`

### Features

The app, Seaworthy, is a simple knock-off of a Startups Created in $LOCATION site, such as madewithlove.in. The bulk of the functionality took a few hours to write, and is comprised of the following features:

* Present startups from a collection in Mongo
* Authentication of users via the Github OAuth provider
* Submission of new startups, with a published field set to false
* Moderation/publication of submissions by a group of admin users
* Searching through the list of startups

### Packages

Minimal usage of third party packages was a goal, to focus on Meteor's core functionality. With that in mind, the following packages were used:

* accounts-github (to enable OAuth)
* service-configuration (to manage OAuth provider configuration)
* underscore (because ES5 forgot to include these functions)
* iron:router (to enable routing; for those unfamiliar, this may as well be part of Meteor core)

Note that OAuth integration requires you to [register an application with github](https://github.com/settings/applications/new). You would then alter the configuration found in `server/services.js`, setting the *clientId* and *secret* keys to the appropriate generated values.

### Frontend

All design and initial (pre-template) markup and CSS was created by @marjoriebennington ...many thanks! SASS/Compass was used to create styling, and `compass watch` can be run in the root of the repo to modify styling.
