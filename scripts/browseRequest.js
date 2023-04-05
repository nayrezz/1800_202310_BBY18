//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("requestCardTemplate");

    db.collection(collection)
        .orderBy("urgent", "desc")
        .orderBy("last_updated", "asc")
        .orderBy("responded")
        .get()   //the collection called "requests"
        .then(allRequests=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allRequests.forEach(doc => { //iterate thru each doc
                var title = doc.data().subject;       // get value of the "name" key
                var details = doc.data().description;  // get value of the "details" key
                var paid = doc.data().paid;
                var amount = doc.data().amount;
                var urgent = doc.data().urgent;
                var location = doc.data().location; 
                var displayname = doc.data().displayname;
                const owner = doc.data().owner;
                var timestamp = doc.data().last_updated;
                
                let newcard = cardTemplate.content.cloneNode(true);

                

                if(urgent){
                    newcard.querySelector('.urgent-title').innerHTML = "Urgent";
                    newcard.querySelector('#urgent-display').style.display = "block"
                } 
                
                newcard.querySelector('.subject').innerHTML = title + (doc.data().responded ? " - RESPONDED" : "");

                if(paid) {
                    const amountString = "$ " + Number(amount).toFixed(2)
                    newcard.querySelector('.value').innerHTML = amountString;
                } else{
                    newcard.querySelector('.value').innerHTML = "Free";
                }
                
                if (doc.data().responded) {
                    newcard.querySelector('.card').style.backgroundColor = "#B4D9BA";
                }

                newcard.querySelector('.community').innerHTML = location;
                newcard.querySelector('.user').innerHTML = displayname;
                newcard.querySelector('.desc').innerHTML = details;

                newcard.querySelector('.btn').addEventListener('click', function() {
                    var ID = doc.id;
                    localStorage.setItem('requestDocID', ID);
                    window.location.href = 'reply.html';
                });

                if (doc.data().last_updated != null && doc.data().last_updated != undefined) {
                    var timeEl = newcard.querySelector('.posttime');
                    timeEl.innerHTML = getTimeElapsed(timestamp);
                  }

                // db.collection("replies").where("requestDocID", "==", doc.id)
                //     .get()
                //     .then(querySnapshot => {
                //         const numReplies = querySnapshot.size;
                //         newcard.querySelector('.numreplies').innerHTML = numReplies;
                //     });

                console.log(doc.id);
                
                    // Fetch and display the number of replies
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
               

                if(owner === firebase.auth().currentUser.uid) {
                    newcard.querySelector('.delete').style.display = 'block';

                    newcard.querySelector('.delete').addEventListener('click', function() {
                        var ID = doc.id;
                        deleteRequest(ID);
                        newcard.parentNode.removeChild(newcard);
                    });
                }

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

displayCardsDynamically("requests");  //input param is the name of the collection

function saveRequestDocumentIDAndRedirect(ID){
    localStorage.setItem('requestDocID', ID);
    window.location.href = 'reply.html';
}

function deleteExpiredPosts() {
    const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
    
    db.collection("requests")
      .where("urgent", "==", true)
      .where("last_updated", "<", new Date(twelveHoursAgo))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log("Document deleted");
          }).catch((error) => {
            console.error("Error deleting document: ", error);
          });
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }
  
  deleteExpiredPosts();

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

function deleteRequest(requestid) {
    var result = confirm("Want to delete?");
    if (result) {
        //Logic to delete the item
        db.collection("requests").doc(requestid)
        .delete()
        .then(() => {
            console.log("Document deleted from Requests collection");
            setTimeout(() => {
                location.reload();
            }, 1000); 
            
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
// deleteDoc(doc(db, "requests", DocID))
;

}





