# BlockBuddy

## 1. Project Description 
Our browser based web application allows users to engage with their neighbourhood by posting requests onto our virtual bulletin board, where other community members are free to accept requests.

Users can create requests that are either paid or unpaid, view other active requests, accept requests, comment on requests, and even customize their profile page.

## 2. Names of Contributors
List team members and/or short bio's here... 
* ...
* Hello my name is Ryan. I'm excited about this project because I get to learn valuable skills.
* ...
* Hi my name is Kari. I'm excited about the project because we get to work in a team!
* ...
* Hi, I am Vitor. I am excited to start this project so that can get some tech project perspective (even if fake)
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML 5, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* ...

## 4. Complete setup/installation/usage
Here are the steps ...
* 1. On our landing page, create an account by entering your preferred email address, name, and password.
* 2. Head over to 'My Profile' to add your phone number, location, and a short bio about yourself. Be sure to click on 'Edit' to modify the fields, and click on the 'Save' button to confirm the changes.
* 3. You're finished! Head on over to 'View Requests' or create your first request under the 'Post a Request' page.

## 5. Known Bugs and Limitations
Here are some known bugs:
* on Mobile view for iPhones, the footer doesn't display properly, but on Samsung Galaxy A51/71 it displays properly.
* After responding to a post, it will display '1 repl(ies)' instead of '1 reply'.
* ...

## 6. Features for Future
What we'd like to build in the future:
* Adding 'friends' within the community
* Ability to add a profile picture to the My Profile page
* A filter option for the View Requests page
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore                  # Git ignore file
├── /404.html                   # what users see if an error occurs
    /aboutUs.html               # page that explains all about Blockbuddy
    /browseRequest.html         # where users view all active requests
    /help.html                  # provides instructions and answers
    /index.html                 # landing HTML file, this is what users see
    /main.html                  # homepage after logging in (shows user name)
    /myRequests.html            # displays requests posted by user
    /privacy.html               # explains our privacy policy
    /profile.html               # user profile page
    /reply.html                 # page when users click on 'respond' to a request
    /request.html               # the page for users to create requests

when you come to url
└── README.md

It has the following subfolders and files:
├── icons                       # Folder for small images
    /trash-can.png              # Used in 'reply.html'
    /trash-can.svg              # Used in 'reply.html'
    /user_icon.png              # Used in 'reply.html'

├── images                      # Folder for images
    /BlockBuddy.png             # Used in 'index.html'
    /BlockBuddy2.png            # Used in 'main.html'
    /navbarlogo.jpg             # Used in 'navOriginal' and 'navbarAfter'
    /favicon.ico                # Used in 'index.html' and 'main.html'

├── scripts                     # Folder for scripts
    /authentication.js          # Authenticates and logs in the user.
    /browseRequest.js           # Used in browseRequest.html -> Creates and populates the requests cards and other subordinate functions (delete request, delete old  urgent requests and calculate time elapsed.)
    /firebaseAPI_BlockBuddy.js  # API for firebase.
    /main.js                    # Used in main.html -> inserts name from firestore.
    /myRequests.js              # Used in myRequests.html -> similar to browseRequest, creates and populates cards for the user and subordinate functions (delete requests, calculate time elapsed)
    /profile.js                 # Used in profile.html -> Populates user info, allows edit of user info, saves user info and a small function to set the location on the dropbox.
    /reply.js                   # Used in reply.html -> Gets and displays the request information, creates cards for replies and populates them, saves the reply information into firestore.
    /request.js                 # Used in request.html -> Saves request information with other validation functions (turns amount field on and off depending on 'paid' being toggled, allows only numbers and decimals for amount)
    /script.js                  # Used in most pages -> logout button function and a function to check if the user is logged in, otherwise sends them to index.html.
    /skeleton.js                # Used in all pages -> Inserts header and footer on the pages.

├── styles                      # Folder for styles
    /styles.css                 # CSS purposes
    /styleRequest.css           # CSS purposes -> for browseRequest and my request pages.

├── text                        # Folder for Navbar & Footer
    /footer.html                # Displays 'about, help, and privacy'
    /navbarAfter.html           # The navbar after logging in
    /navOriginal.html           # The navbar before logging in


``


## Contact 
* Ryan Zhang - rzhang66@my.bcit.ca 
* Vitor Guara - 
* Kari Sturgeon - 

## Acknowledgements 
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://fonts.adobe.com/">Adobe Fonts</a> 
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://stock.adobe.com/images">Adobe Stock Images</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>