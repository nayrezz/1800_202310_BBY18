
// logsout the user.
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

//If the user is not logged, bumps them to index

function checkLoginStatusAndRedirect() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}
