// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBv7WTWx8xD38z5VmELxGfQ7Ppq8aZVRC0",
  authDomain: "bits-grievance-1c10f.firebaseapp.com",
  databaseURL: "https://bits-grievance-1c10f.firebaseio.com",
  projectId: "bits-grievance-1c10f",
  storageBucket: "bits-grievance-1c10f.appspot.com",
  messagingSenderId: "1021779148460",
  appId: "1:1021779148460:web:76602bb8ba6b1619bae909",
  measurementId: "G-QJX4LEQ6BV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//refernce users collection
var userRef = firebase.firestore();
var submitButton = document.getElementById("submitButton");

//submit form
function submitForm() {
  //get values
  var fname = getVal("fname");
  var lname = getVal("lname");
  var en_no = getVal("en_no");
  var branch = getVal("branch");
  var semester = getVal("semester");
  var mobile = getVal("mobile");
  var email = getVal("email");
  var password = getVal("password");

  //check existing user
  userRef
    .doc("Users/" + en_no)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        $("#errorUserMsg").show();
        return false;
      } else {
        $("#errorUserMsg").hide();

        //save users
        saveUsers(
          fname,
          lname,
          en_no,
          branch,
          semester,
          mobile,
          email,
          password
        );
        setTimeout(function() {
          window.alert("Successfully registered");
          window.location = "index.html";
        }, 3000);
      }
    });
}

//function to get form values

function getVal(id) {
  return document.getElementById(id).value;
}

//save users to firebase
function saveUsers(
  fname,
  lname,
  en_no,
  branch,
  semester,
  mobile,
  email,
  password
) {
  const newUserRef = userRef.doc("Users/" + en_no);
  newUserRef
    .set({
      "First Name": fname,
      "Last Name": lname,
      "Enrollment No": en_no,
      Branch: branch,
      Semester: semester,
      "Phone Number": mobile,
      "Email Id": email,
      Password: password
    })
    .catch(function(error) {
      window.alert("Something went wrong. Please try again");
    });
}
