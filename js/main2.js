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

//reference users collection
var userRef = firebase.firestore().collection("Users");
var grievanceRef = firebase.firestore();

//check for user existence
function chkUser() {
  var en_no = document.getElementById("en_no").value;
  userRef
    .doc(en_no)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        $("#errorEn_noMsg").hide();
        submitGrievance(en_no);
      } else {
        $("#errorEn_noMsg").show();
        return false;
      }
    })
    .catch(function () {
      window.alert("Something went wrong. Please try again");
    });
}
//submit form
function submitGrievance(en_no) {
  //get values
  var category = getVal("category");
  var subject = getVal("subject");
  var description = getVal("description");

  //get other info of users
  userRef
    .where("Enrollment No", "==", en_no)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var fname = doc.get("First Name");
        var lname = doc.get("Last Name");
        var en_no = doc.get("Enrollment No");
        var branch = doc.get("Branch");
        var semester = doc.get("Semester");
        //save users
        saveGrievance(
          en_no,
          fname,
          lname,
          branch,
          semester,
          category,
          subject,
          description
        );
      });
    });

  setTimeout(function () {
    window.alert("Grievance submitted successfully.\n Signing out");
    window.location.href = "index.html";
  }, 3000);
}

//function to get form values
function getVal(id) {
  return document.getElementById(id).value;
}

//save users to firebase
function saveGrievance(
  en_no,
  fname,
  lname,
  branch,
  semester,
  category,
  subject,
  description
) {
  const newGrievanceRef = grievanceRef.doc("Forms/" + en_no);
  var timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  newGrievanceRef
    .set({
      "1Updated Time": timeStamp,
      "First Name": fname,
      "Last Name": lname,
      "Enrollment No": en_no,
      Branch: branch,
      Semester: semester,
      Category: category,
      Subject: subject,
      Description: description
    })
    .catch(function () {
      window.alert("Something went wrong. Please try again");
    });
}
