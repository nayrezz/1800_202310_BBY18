function sayHello() {
    
}

function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("requestCardTemplate");

  db.collection(collection).get()   //the collection called "hikes"
      .then(allRequests=> {
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
              if (urgent){
                  newcard.querySelector('.urgent-title').innerHTML = "Urgent";
              }
              
              newcard.querySelector('.subject').innerHTML = title;

              if(paid) {
                  newcard.querySelector('.value').innerHTML = amount;
              } else{
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

function showMyPosts() {
  firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
         // User is signed in.
         // Do something for the user here. 

         // Go to get the user's document
         db.collection("users").doc(user.uid).get()
             .then(doc => {
                 console.log(doc.data());

                 // Extract the array for myposts
                 var myposts = doc.data().myposts;

                 // Iterate thru the array
                 myposts.forEach(item => {
                     console.log(item);

                     // For each item in array, read the post document
                     db.collection("requests").doc(item)
                     .get()
                     .then(doc =>{
                         // Output details about that Post
                         console.log(doc.data().description);
                         //displayCardPost(doc.data());
                         displayCardsDynamically(doc.data())
                     })
                 })
             })
     } else {
         // No user is signed in.
         console.log("Error: no user is logged in");   
     } 
 })
}
showMyPosts();



// displayCardsDynamically("requests");  //input param is the name of the collection

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