
console.log("Hello world!");

if (Meteor.isClient) {



}

if(Meteor.isServer) {
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1}});
  });

  Meteor.methods({
    'insertPlayerData': function(playerNameVar) {
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
    },
    'removePlayerData': function(selectedPlayer) {
      var currentUserId = Meteor.userId();
      PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue) {
      var currentUserId = Meteor.userId();
      PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue} });
    }

  });

}

PlayersList = new Mongo.Collection('players');

// 'modifyPlayerScore': function(selectedPlayer, scoreValue){
//     var currentUserId = Meteor.userId();
//     PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
//                         {$inc: {score: scoreValue} });
// }

