// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7mDC3-LCQlOeLrzpMRJdHAS71rJbMr90",
    authDomain: "wildlife-2a4ed.firebaseapp.com",
    databaseURL: "https://wildlife-2a4ed-default-rtdb.firebaseio.com",
    projectId: "wildlife-2a4ed",
    storageBucket: "wildlife-2a4ed.appspot.com",
    messagingSenderId: "547861109900",
    appId: "1:547861109900:web:ab7bf244de401cc860afa9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref("contactForm");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal("modal-name");
    var num = getInputVal("modal-number");
    var message = getInputVal("modal-description");

    // Get city from API call
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            var city = data.city;
            var pin = data.postal;
            var state = data.region;
            // Save message
            saveMessage(name, num, message, city,pin,state);
        });

        // document.querySelector(".alert").style.display = "block";
        // setTimeout(() => {
        //     document.querySelector(".alert").style.display = "none";
        // }, 3000);
        setTimeout(() => {
              alert("Your data has been sent to the Forest Department and also on the nearest Police station");
        }, 3000);
}
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Reset the form fields
    this.reset();
});
// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}




// Save message to firebase
function saveMessage(name, num, message, city,pin,state) {
    var newMessageRef = contactFormDB.push();
    newMessageRef.set({
        name: name,
        Mobile : num,
        message: message,
        city: city,
        pin : pin,
        state : state,
    });

    // Print sent values to console
    // console.log(`Name: ${name}`);
    // console.log(`Email: ${email}`);
    // console.log(`Message: ${message}`);
    // console.log(`City: ${city}`);
}
