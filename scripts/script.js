function sayHello() {
    
}
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

//sayHello();

// function savePost() {
//     alert ("SAVE POST is triggered");
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             // Do something for the user here. 
//             var desc = document.getElementById("description").value;
//             var sub = document.getElementById("subject").value;
//             var isPaid = document.getElementById("paid").checked;
//             var amount = document.getElementById("amount").value;
//             var isUrgent = document.getElementById("urgentCheck").checked;
//             var loc = document.getElementById("location").value;
//             db.collection("requests").add({
//                 owner: user.uid,
//                 description: desc,
//                 subject: sub,
//                 paid: isPaid,
//                 amount: amount,
//                 urgent: isUrgent,
//                 location: loc,
//                 last_updated: firebase.firestore.FieldValue
//                     .serverTimestamp() //current system time
//             }).then(doc => {
//                 console.log("Post document added!");
//                 console.log(doc.id);
//                 saveNewPostID(user.uid, doc.id);
//             })
//         } else {
//             // No user is signed in.
//         }
//     });
// }