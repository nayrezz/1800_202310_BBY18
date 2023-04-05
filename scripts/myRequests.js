

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("requestCardTemplate");

    db.collection(collection).get()   //the collection called "hikes"
        .then(allRequests => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allRequests.forEach(doc => { //iterate thru each doc
                var title = doc.data().subject;       // get value of the "name" key
                var details = doc.data().description;  // get value of the "details" key
                var paid = doc.data().paid;
                var amount = doc.data().amount;
                var urgent = doc.data().urgent;
                var location = doc.data().location; //gets the length field
                let newcard = cardTemplate.content.cloneNode(true);


                //update title and text and image
                if (urgent) {
                    newcard.querySelector('.urgent-title').innerHTML = "Urgent";
                    newcard.querySelector('#urgent-display').style.display = "block"
                }

                newcard.querySelector('.subject').innerHTML = title;

                if (paid) {
                    newcard.querySelector('.value').innerHTML = amount;
                } else {
                    newcard.querySelector('.value').innerHTML = "Free";
                }

                newcard.querySelector('.community').innerHTML = location;
                newcard.querySelector('.desc').innerHTML = details;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}


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
                        if (urgent) {
                            newcard.querySelector('.urgent-title').innerHTML = "Urgent";
                            newcard.querySelector('#urgent-display').style.display = "block"
                        }

                        newcard.querySelector('.subject').innerHTML = title + (doc.data().responded ? " - RESPONDED" : "");

                        if (paid) {
                            const amountString = "$ " + Number(amount).toFixed(2)
                            newcard.querySelector('.value').innerHTML = amountString;
                        } else {
                            newcard.querySelector('.value').innerHTML = "Free";
                        }

                        if (doc.data().responded) {
                            newcard.querySelector('.card').style.backgroundColor = "#B4D9BA";
                        }

                        newcard.querySelector('.community').innerHTML = location;
                        newcard.querySelector('.desc').innerHTML = details;
                        // newcard.querySelector('#delete-request').onclick = () => deleteRequest(doc.id);

                        let numRepliesEl = newcard.querySelector('.numreplies');
                  
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

                          if (doc.data().last_updated != null && doc.data().last_updated != undefined) {
                            var timeEl = newcard.querySelector('.posttime');
                            timeEl.innerHTML = getTimeElapsed(timestamp);
                          }

                          let respondedEl = newcard.querySelector('#responded');
                          newcard.querySelector('#responded').addEventListener('click', function() {
                            var confirmed = confirm("Was this request responded?");
                            if (confirmed) {
                              var requestRef = db.collection('requests').doc(doc.id);
                              requestRef.update({
                                responded: true,
                                respondedTime: firebase.firestore.FieldValue.serverTimestamp()
                              })
                              .then(function() {
                                console.log("Request responded successfully!");
                                newcard.querySelector('.subject').innerHTML = title + " - RESPONDED";
                                newcard.querySelector('.card').style.backgroundColor = "#B4D9BA"
                              })
                              .catch(function(error) {
                                console.error("Error responding to request: ", error);
                              });
                            }
                          });
  

                        
                        if(owner === firebase.auth().currentUser.uid) {
                            newcard.querySelector('.delete').style.display = 'block';
        
                            newcard.querySelector('.delete').addEventListener('click', function() {
                                var ID = doc.id;
                                deleteRequest(ID);
                                newcard.parentNode.removeChild(newcard);
                            });
                        }


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
                }, 1000); // Reload after 1 second (1000 milliseconds)
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    // deleteDoc(doc(db, "requests", DocID))
    ;

}

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
