function savePost() {
    alert ("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var desc = document.getElementById("description").value;
            var sub = document.getElementById("subject").value;
            var isPaid = document.getElementById("paid").checked;
            var amount = document.getElementById("amount").value;
            var isUrgent = document.getElementById("urgentCheck").checked;
            var loc = document.getElementById("location").value;
            db.collection("requests").add({
                owner: user.uid,
                displayname: user.displayName,
                description: desc,
                subject: sub,
                paid: isPaid,
                amount: amount,
                urgent: isUrgent,
                location: loc,
                last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
            }).then(doc => {
                console.log("Post document added!");
                console.log(doc.id);
                saveNewPostID(user.uid, doc.id);
                window.location.href = "reply.html";
            })
        } else {
            // No user is signed in.
        }
    });
}
let selectedLocation = '';
function setLocation(location) {
    selectedLocation = location;
    document.getElementById("selectedLocation").textContent = location;

  }