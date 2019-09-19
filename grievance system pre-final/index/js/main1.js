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
function submitForm() {

    //get values
    var fname = getVal('fname');
    var lname = getVal('lname');
    var en_no = getVal('en_no');
    var branch = getVal('branch');
    var semester = getVal('semester');
    var mobile = getVal('mobile');
    var email = getVal('email');
    var password = getVal('password');

    //save users
   saveUsers(fname, lname, en_no, branch, semester, mobile, email, password);
}

//function to get form values

function getVal(id) {
    return document.getElementById(id).value;
}

//save users to firebase
function saveUsers(fname, lname, en_no, branch, semester, mobile, email, password) {
    const newUserRef = userRef.doc("Users/" + en_no);
    newUserRef.set({
        fname: fname,
        lname: lname,
        en_no: en_no,
        branch: branch,
        semester: semester,
        mobile: mobile,
        email: email,
        password: password
    }).catch(function(error) {
        console.log("Got an error",error);
    });
}
