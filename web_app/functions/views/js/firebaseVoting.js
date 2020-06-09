function addEngine(){

  var database = firebase.database()
  var engineRef = database.ref('/engines')

  var engineInput = document.getElementById('addEngine')


  var engineName = engineInput.value
  engineInput.value = ''

  engineRef.push({
    name: engineName,
    votes: 0,
    upvoters: {},
    downvoters: {}
  })
    .then(function(){
      window.location.reload()
    })
    .catch(function(error){
      console.log(error)
    })

}

function upvote(key){
  console.log(key)
  var database = firebase.database()

  var user = firebase.auth().currentUser
  var userId = user.uid
  var displayName = user.displayName

  var engineVotesRef = database.ref('/engines/' + key + '/votes/' + userId)

  engineVotesRef.set(displayName)

  .then(function(){
    window.location.reload()
  })
  .catch(function(err){
    console.log(err)
  })
}

function downvote(key){
  console.log(key)
  var database = firebase.database()

  var user = firebase.auth().currentUser
  var userId = user.uid

  var engineVotesRef = database.ref('/engines/' + key + '/votes/' + userId)
  .remove()

  .then(function(){
    window.location.reload()
  })
  .catch(function(err){
    console.log(err)
  })
}
