

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
                    let newcard = cardTemplate.content.cloneNode(true);

                    if (owner == uid) {
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
                        newcard.querySelector('#delete-request').onclick = () => deleteRequest(doc.id);
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
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    // deleteDoc(doc(db, "requests", DocID))
    alert ("Your request has been deleted.");

}


function deleteFromRequests(requestid) {
    firebase.auth().onAuthStateChanged(user => {
            })
            .then(() => {
                console.log("2. post deleted from user doc");
                deleteFromStorage(requestid);
            })
        }






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