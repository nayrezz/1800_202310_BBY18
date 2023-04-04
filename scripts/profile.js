
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var lastName = userDoc.data().lastName;
                    var prefName = userDoc.data().prefName;
                    var email = userDoc.data().email;
                    var phone = userDoc.data().phone;
                    var location = userDoc.data().location;
                    console.log(location);
                    var interests = userDoc.data().interests;
                    var occupation = userDoc.data().occupation;
                    

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("firstName").value = userName;
                    }
                    if (lastName != null) {
                        document.getElementById("lastName").value = lastName;
                    }
                    if (prefName != null) {
                        document.getElementById("prefName").value = prefName;
                    }
                    if (email != null) {
                        document.getElementById("email").value = email;
                    }
                    if (phone != null) {
                        document.getElementById("phone").value = phone;
                    }
                    if (location != null) {
                        document.getElementById("selectedLocation").textContent = location;
                    }
                    if (interests != null) {
                        document.getElementById("interests").value = interests;
                    }
                    if (occupation != null) {
                        document.getElementById("occupation").value = occupation;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
  //enter code here
  const userId = firebase.auth().currentUser.uid; // get the current user's ID
  const userRef = firebase.firestore().collection("users").doc(userId);


  userName = document.getElementById('firstName').value;          
  lastName = document.getElementById("lastName").value;
  prefName = document.getElementById("prefName").value;
  email = document.getElementById("email").value;
  phone = document.getElementById("phone").value;
  interests = document.getElementById("interests").value;
  occupation = document.getElementById("occupation").value;

  userRef.update({
      name: userName,
      lastName: lastName,
      prefName: prefName,
      email: email,
      phone: phone,
      location: selectedLocation,
      interests: interests,
      occupation: occupation,



  })
  .then(() => {
      console.log("Document successfully updated!");
      document.getElementById('personalInfoFields').disabled = true;
      location.reload(); // refresh the page
  })

  .catch((error) => {
    console.error("Error updating document: ", error);
    });


}
let selectedLocation = '';
function setLocation(location) {
    selectedLocation = location;
    document.getElementById("selectedLocation").textContent = location;

  }

  function deleteUser() {
    firebase.auth().onAuthStateChanged(user => {

            // Double check! Usability Heuristics #5
            var result = confirm("WARNING " + user.displayName + 
            ": Deleting your User Account!!");

            // If confirmed, then go ahead
            if (result) {
                // First, delete from Firestore users collection 
                db.collection("users").doc(user.uid).delete()
                    .then(() => {
                        console.log("Deleted from Firestore Collection");

                        // Next, delete from Firebase Auth
                        user.delete().then(() => {
                            console.log("Deleted from Firebase Auth.");
                            alert("user has been deleted");
                            window.location.href = "index.html";
                        }).catch((error) => {
                            console.log("Error deleting from Firebase Auth " + error);
                        });
                    }).catch((error) => {
                        console.error("Error deleting user: ", error);
                    });
            }
    })
}
