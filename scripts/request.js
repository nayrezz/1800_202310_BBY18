function savePost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var desc = document.getElementById("description").value;
            var sub = document.getElementById("subject").value;
            var isPaid = document.getElementById("paid").checked;
            var amount = document.getElementById("amount").value;
            var isUrgent = document.getElementById("urgentCheck").checked;

            if (!desc || !sub || !location) {
                alert("Please fill subject, description and location to post.");
                return;
            }


            // Validation: Check if amount is required for paid requests
            if (isPaid && !amount) {
                alert("Please enter the amount.");
                return;
            }

            db.collection("requests").add({
                owner: user.uid,
                displayname: user.displayName,
                description: desc,
                subject: sub,
                paid: isPaid,
                amount: amount,
                urgent: isUrgent,
                location: selectedLocation,
                last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
            }).then(doc => {
                console.log("Post document added!");
                console.log(doc.id);
                localStorage.setItem("requestDocID", doc.id);
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

  
const isPaidCheckbox = document.getElementById('paid');
isPaidCheckbox.addEventListener('change', toggleAmountField);

// Function to toggle 'amount' field based on 'isPaid' checkbox
function toggleAmountField() {
  const amountField = document.getElementById('amount');
  if (isPaidCheckbox.checked) {
    amountField.disabled = false;
  } else {
    amountField.disabled = true;
  }
}

function validateAmountInput(event) {
    const input = event.target.value;
    const regex = /^\d*\.?\d{0,2}$/; // const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // const regex = /^\d+(\.\d{1,2})?$/; 
    if (!regex.test(input)) {
      event.target.value = ""; 
    }
  }