
var requestDocID = localStorage.getItem("requestDocID");    //visible to all functions on this page

console.log(requestDocID);

function displayRequestDetails(requestName, urgency, paid, location, description, amount) {
  document.getElementById("requestName").innerHTML = requestName;
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

        displayRequestDetails(requestName, urgency, paid, location, description, amount);

          });
}

getRequestDetails(requestDocID);

function populateReplies() {
  let replyTemplate = document.getElementById("replyTemplate");
  let repliesGroup = document.getElementById("replies-go-here");

  //let params = new URL(window.location.href) //get the url from the searbar
  //let hikeID = params.searchParams.get("docID");
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
              console.log(time)

              let replyCard = replyTemplate.content.cloneNode(true);
              replyCard.querySelector('#type').innerHTML = respond;     //equiv getElementByClassName
              replyCard.querySelector('#user').innerHTML = displayname;     //equiv getElementByClassName
              if (days > 0) {
                // If the reply was posted more than 24 hours ago, display the number of days
                replyCard.querySelector('#time').innerHTML = ' - ' + days + ' day' + (days > 1 ? 's' : '') + ' ago';
              } else {
                // Otherwise, display the number of hours
                replyCard.querySelector('#time').innerHTML = ' - ' + hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
              }  
              replyCard.querySelector('#reply-detail').innerHTML = details;
              repliesGroup.appendChild(replyCard);
          })
      })
}
populateReplies();






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
