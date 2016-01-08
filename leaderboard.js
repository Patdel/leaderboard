
console.log("Hello world!");

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return "Some other text";
    },
    'otherHelperFunction': function() {
       return "Some other function";
    }
  });

}

if(Meteor.isServer) {

}

PlayersList = new Mongo.Collection('players');
