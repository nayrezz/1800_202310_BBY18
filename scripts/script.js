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

function checkLoginStatusAndRedirect() {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}
