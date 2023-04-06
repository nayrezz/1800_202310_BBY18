


//displays the logged in user cards.

function showMyPosts(collection) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const uid = user.uid

            let cardTemplate = document.getElementById("requestCardTemplate");

            db.collection(collection).get().then(allRequests => {
                allRequests.forEach(doc => {
                    var title = doc.data().subject;
                    var details = doc.data().description;
                    var paid = doc.data().paid;
                    var amount = doc.data().amount;
                    var urgent = doc.data().urgent;
                    var location = doc.data().location;
                    var owner = doc.data().owner;
                    var timestamp = doc.data().last_updated;
                    let newcard = cardTemplate.content.cloneNode(true);

                    if (owner == uid) {

                        //shows urgent only if urgent.
                        if (urgent) {
                            newcard.querySelector('.urgent-title').innerHTML = "Urgent";
                            newcard.querySelector('#urgent-display').style.display = "block"
                        }

                        //display responded only if responded.
                        newcard.querySelector('.subject').innerHTML = title + (doc.data().responded ? " - RESPONDED" : "");


                        //shows the amount only if paid and with 2 decimals.
                        if (paid) {
                            const amountString = "$ " + Number(amount).toFixed(2)
                            newcard.querySelector('.value').innerHTML = amountString;
                        } else {
                            newcard.querySelector('.value').innerHTML = "Free";
                        }

                        //if responded show post with green background
                        if (doc.data().responded) {
                            newcard.querySelector('.card').style.backgroundColor = "#B4D9BA";
                        }

                        newcard.querySelector('.community').innerHTML = location;
                        newcard.querySelector('.desc').innerHTML = details;

                        let numRepliesEl = newcard.querySelector('.numreplies');
                  
                        //displays the number of replies.
                        db.collection("replies").where("requestDocID", "==", doc.id)
                          .get()
                          .then(querySnapshot => {
                            console.log(doc.id)
                            const numReplies = querySnapshot.size;
                            console.log(numReplies)
                            numRepliesEl.innerHTML = numReplies + " Replies";
                          })
                          .catch(error => {
                            console.log("Error getting replies: ", error);
                          });

                          // calls time elapsed to display how long ago rquest was made
                          if (doc.data().last_updated != null && doc.data().last_updated != undefined) {
                            var timeEl = newcard.querySelector('.posttime');
                            timeEl.innerHTML = getTimeElapsed(timestamp);
                          }

                          let respondedEl = newcard.querySelector('#responded');

                          // Responded button turns on and off the responded status
                          // it triggers the UI changes.
                        newcard.querySelector('#responded').addEventListener('click', function() {
                            var requestRef = db.collection('requests').doc(doc.id);
                            requestRef.get().then(function(doc) {
                                if (doc.exists) {
                                    var responded = doc.data().responded;
                                    var confirmed;
                                    if (responded) {
                                        confirmed = confirm("Do you want to mark this request as not responded?");
                                    } else {
                                        confirmed = confirm("Was this request responded?");
                                    }
                                    if (confirmed) {
                                        requestRef.update({
                                            responded: !responded,
                                            respondedTime: firebase.firestore.FieldValue.serverTimestamp()
                                        })
                                        .then(function() {
                                            console.log("Request responded status updated successfully!");
                                            window.location.reload(); // Reload the page to reflect the changes
                                        })
                                        .catch(function(error) {
                                            console.error("Error updating request responded status: ", error);
                                        });
                                    }
                                } else {
                                    console.log("No such request document!");
                                }
                            }).catch(function(error) {
                                console.error("Error getting request document: ", error);
                            });
                        });

                        //button to delete request.
                        if(owner === firebase.auth().currentUser.uid) {
                            newcard.querySelector('.delete').style.display = 'block';
        
                            newcard.querySelector('.delete').addEventListener('click', function() {
                                var ID = doc.id;
                                deleteRequest(ID);
                                newcard.parentNode.removeChild(newcard);
                            });
                        }

                        //"read more/reply" provides the info to the reply page if clicked.
                        newcard.querySelector('.readreply').addEventListener('click', function() {
                            var ID = doc.id;
                            localStorage.setItem('requestDocID', ID);
                            window.location.href = 'reply.html';

                        });

                        document.getElementById(collection + "-go-here").appendChild(newcard);
                    }
                })
            })
        } else {
            // No user is signed in.
            console.log("Error: no user is logged in");
        }

    })
}

showMyPosts("requests");

//function to delete request.
function deleteRequest(requestid) {
        var result = confirm("Want to delete?");
        if (result) {
            //Logic to delete the item
            db.collection("requests").doc(requestid)
            .delete()
            .then(() => {
                console.log("1. Document deleted from Requests collection");
                setTimeout(() => {
                    location.reload();
                }, 1000); // Reload after 1 second (it was not working when loading withou delay)
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    ;

}

//function to bring the how long ago post was made.
function getTimeElapsed(timestamp) {
    var now = Date.now();
    var diff = now - timestamp.toMillis();

    var minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }

    var hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    }

    var days = Math.floor(hours / 24);
    return `${days} days ago`;
}
