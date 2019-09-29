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
var userRef = firebase.firestore().collection("Users");

//validating with database
function submitLoginForm() {
  var en_no = document.getElementById("en_no").value;
  var password = document.getElementById("Password").value;
  userRef
    .doc(en_no)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        $("#errorUserMsg").hide();
        userRef
          .where("Enrollment No", "==", en_no)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.data().Password != password) {
                document.getElementById("errorPasswordMsg").style.display =
                  "block";
              } else {
                document.getElementById("errorPasswordMsg").style.display =
                  "none";
                //      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("loginButton", {
                //          'size': 'invisible',
                //          'callback': function() {
                //           // reCAPTCHA solved, allow signInWithPhoneNumber.
                //           //var phoneNumber = getPhoneNumberFromUserInput();
                //  var appVerifier = window.recaptchaVerifier;
                //  firebase.auth().signInWithPhoneNumber("8469873001", appVerifier)
                //      .then(function (confirmationResult) {
                //        // SMS sent. Prompt user to type the code from the message, then sign the
                //        // user in with confirmationResult.confirm(code).
                //        window.confirmationResult = confirmationResult;
                //       // var code = getCodeFromUserInput();
                //         confirmationResult.confirm(code).then(function (result) {
                //         // User signed in successfully.
                //         var user = result.user;
                //         // ...
                //         }).catch(function () {
                //         // User couldn't sign in (bad verification code?)
                //         // ...
                //         });
                //      }).catch(function () {
                //        // Error; SMS not sent
                //        // ...
                //      });
                //          onSignInSubmit();
                //            alert("working");
                //          }
                //    });

                window.location = "grievances.html";
              }
            });
          })
          .catch(function () {
            window.alert("Something went wrong. Please try again");
          });
      } else {
        $("#errorUserMsg").show();
      }
    });
}
