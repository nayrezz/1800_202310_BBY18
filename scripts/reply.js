
var requestDocID = localStorage.getItem("requestDocID");    //visible to all functions on this page

console.log(requestDocID);

function displayRequestDetails(requestName, urgency, paid, location, description) {
  document.getElementById("requestName").innerHTML = requestName;
  if (urgency) {
    document.getElementById("urgent").style.display = "block";
  }
  if (paid) {
    document.getElementById("paid").style.display = "block";
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
        var location = thisRequest.data().location;
        var description = thisRequest.data().description;

        displayRequestDetails(requestName, urgency, paid, location, description);

          });
}

getRequestDetails(requestDocID);

function writeReply() {
  console.log("inside reply")
  let Respond = document.querySelector('input[name="Res-cla"]:checked').value;
  let details= document.getElementById("details").value;
  console.log(Respond, details);

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          var currentUser = db.collection("users").doc(user.uid)
          var userID = user.uid;
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  var userEmail = userDoc.data().email;
                  db.collection("replies").add({
                      requestDocID: requestDocID,
                      respond: Respond,
                      userID: userID,
                      details: details,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  }).then(() => {
                      window.location.href = "browseRequest.html"; //new line added
                  })
              })
      } else {
          console.log("No user is signed in");
          window.location.href = 'index.html';
      }
  });
}
