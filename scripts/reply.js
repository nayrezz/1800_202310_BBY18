
var requestDocID = localStorage.getItem("requestDocID");    //visible to all functions on this page


//displays the request details after getting them.
function displayRequestDetails(requestName, urgency, paid, location, description, amount, responded) {
  
  document.getElementById("requestName").innerHTML = requestName + (responded ? " - RESPONDED" : "");
  if (urgency) {
    document.getElementById("urgent").style.display = "block";
  }
  if (paid) {
    document.getElementById("paid").innerHTML = "$" + amount;
  } else {
    document.getElementById("paid").innerHTML = "FREE";
  }
  document.getElementById("location").innerHTML = location;
  document.getElementById("description").innerHTML = description;
}




//Gets the request details from previous page and then calls display requests..
function getRequestDetails(id) {
    db.collection("requests")
      .doc(id)
      .get()
      .then((thisRequest) => {
        var requestName = thisRequest.data().subject;
        var urgency = thisRequest.data().urgent;
        var paid = thisRequest.data().paid;
        var amount = thisRequest.data().amount;
        var location = thisRequest.data().location;
        var description = thisRequest.data().description;
        var responded = thisRequest.data().responded;

        displayRequestDetails(requestName, urgency, paid, location, description, amount, responded);

          });
}


getRequestDetails(requestDocID);

//Populates the replies.
function populateReplies() {
  let replyTemplate = document.getElementById("replyTemplate");
  let repliesGroup = document.getElementById("replies-go-here");

  var requestID = localStorage.getItem("requestDocID");
  
  db.collection("replies").where( "requestDocID", "==", requestID).get()
      .then(allReplies => {
          replies=allReplies.docs;
          console.log(replies);
          replies.forEach(doc => {
              var respond = doc.data().respond; 
              var details = doc.data().details; 
              var time = doc.data().timestamp.toDate();
              var now = new Date();
              var diff = now - doc.data().timestamp.toDate();
              var hours = Math.floor(diff / (1000 * 60 * 60));
              var days = Math.floor(hours / 24);
              const displayname = doc.data().displayname;
              const owner = doc.data().userID;
              console.log(time)

              let replyCard = replyTemplate.content.cloneNode(true);
              
              
              replyCard.querySelector('#type').innerHTML = respond;

              
              replyCard.querySelector('#user').innerHTML = displayname;    
              if (days > 0) {
                // If the reply was posted more than 24 hours ago, display the number of days
                replyCard.querySelector('#time').innerHTML = ' - ' + days + ' day' + (days > 1 ? 's' : '') + ' ago';
              } else {
                // Otherwise display the number of hours
                replyCard.querySelector('#time').innerHTML = ' - ' + hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
              }  
              replyCard.querySelector('#reply-detail').innerHTML = details;


              //Shows the delete button only if the owner of the reply is logged in
              if(owner === firebase.auth().currentUser.uid) {
                replyCard.querySelector('.delete').style.display = 'block';
                console.log(owner);
                console.log(firebase.auth().currentUser.uid);


                replyCard.querySelector('.delete').addEventListener('click', function() {
                    var ID = doc.id;
                    deleteReply(ID);
                    replyCard.parentNode.removeChild(replyCard);
                });
            }


              repliesGroup.appendChild(replyCard);
          })
      })
}
populateReplies();





// Gets the information from the reply into firebase.
function writeReply() {
  console.log("inside reply")
  let Respond = document.querySelector('input[name="Res-cla"]:checked').value;
  let details= document.getElementById("details").value;
  console.log(Respond, details);

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid)
          var userID = user.uid;
          const displayname = user.displayname;
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  var userEmail = userDoc.data().email;
                  db.collection("replies").add({
                      requestDocID: requestDocID,
                      respond: Respond,
                      userID: userID,
                      displayname: user.displayName,
                      details: details,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(() => {
                      location.reload(); // refresh the page
                  })
              })
      } else {
          console.log("No user is signed in");
          window.location.href = 'index.html';
      }
  });
}


// function to delete a reply.
function deleteReply(replyid) {
  var result = confirm("Want to delete?");
  if (result) {
      //Logic to delete the item
      db.collection("replies").doc(replyid)
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
;

}