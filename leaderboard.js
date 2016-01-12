
console.log("Hello world!");

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'player': function() {
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
    },
    'otherHelperFunction': function() {

    },
    'numberOfPlayers': function() {
       return PlayersList.find().count();
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId === selectedPlayer) {
        return "selected";
      }

    }
  });

  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer =  Session.get('selectedPlayer');
      console.log(selectedPlayer);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });

}

if(Meteor.isServer) {

}

PlayersList = new Mongo.Collection('players');
