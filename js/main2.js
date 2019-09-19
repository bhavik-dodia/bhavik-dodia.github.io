// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5tZjiWD8oMSDZOIQ8AK-iW4Z-Yp6lwJQ",
    authDomain: "sample-207b3.firebaseapp.com",
    databaseURL: "https://sample-207b3.firebaseio.com",
    projectId: "sample-207b3",
    storageBucket: "sample-207b3.appspot.com",
    messagingSenderId: "876016553169",
    appId: "1:876016553169:web:d28e11c1e15d54fe8e49f0"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

//refernce users collection
    var userRef = firebase.firestore();
    var submitButton = document.getElementById("submitButton");

//submit form
function submitGrievance() {

    //get values
    var category = getVal('category');
    var subject = getVal('subject');
    var description = getVal('description');

    //save users
   saveGrievance(category, subject, description);
}

//function to get form values

function getVal(id) {
    return document.getElementById(id).value;
}

//save users to firebase
function saveGrievance(category, subject, description) {
    const newUserRef = userRef.doc("Grievances/" + en_no);
    newUserRef.set({
        category: category,
        subject: subject,
        description: description,
    }).catch(function(error) {
        console.log("Got an error",error);
    });
}
