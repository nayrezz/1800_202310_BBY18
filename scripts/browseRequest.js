//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("requestCardTemplate");

    db.collection(collection).get()   //the collection called "requests"
        .then(allRequests=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allRequests.forEach(doc => { //iterate thru each doc
                var title = doc.data().subject;       // get value of the "name" key
                var details = doc.data().description;  // get value of the "details" key
                var paid = doc.data().paid;
                var amount = doc.data().amount;
                var urgent = doc.data().urgent;
                var location = doc.data().location; //gets the length field
                const displayname = doc.data().displayname;
                let newcard = cardTemplate.content.cloneNode(true);

                
                //update title and text and image
                if(urgent){
                    newcard.querySelector('.urgent-title').innerHTML = "Urgent";
                    newcard.querySelector('#urgent-display').style.display = "block"
                } 
                
                newcard.querySelector('.subject').innerHTML = title;

                if(paid) {
                    newcard.querySelector('.value').innerHTML = amount;
                } else{
                    newcard.querySelector('.value').innerHTML = "Free";
                }
                
                newcard.querySelector('.community').innerHTML = location;
                newcard.querySelector('.user').innerHTML = displayname;
                newcard.querySelector('.desc').innerHTML = details;

                newcard.querySelector('.btn').addEventListener('click', function() {
                    var ID = doc.id;
                    localStorage.setItem('requestDocID', ID);
                    window.location.href = 'reply.html';
                });

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

displayCardsDynamically("requests");  //input param is the name of the collection

function saveRequestDocumentIDAndRedirect(ID){
    localStorage.setItem('requestDocID', ID);
    window.location.href = 'reply.html';
}