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
var phoneNumber;



//validating with database
function valAndGenOTP() {
    var en_no = document.getElementById("en_no").value;

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
                            window.alert("1");
                            phoneNumber = doc.get("Phone Number");
                            window.alert(phoneNumber);
                            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
                                'recaptcha-container');
                            // {
                            //   size: 'invisible',
                            //   callback: function (response) {
                            // reCAPTCHA solved, allow signInWithPhoneNumber.
                            //var en_no = document.getElementById("en_no").value;
                            // userRef
                            //   .where("Enrollment No", "==", en_no)
                            //   .get()
                            //   .then(function (querySnapshot) {
                            //     querySnapshot.forEach(function (doc) {
                            //       var phoneNumber = doc.get("Phone Number");
                            var appVerifier = window.recaptchaVerifier;
                            window.alert("2");
                            firebase
                                .auth()
                                .signInWithPhoneNumber(phoneNumber, appVerifier)
                                .then(function (confirmationResult) {
                                    // SMS sent. Prompt user to type the code from the message, then sign the
                                    // user in with confirmationResult.confirm(code).
                                    window.confirmationResult = confirmationResult;
                                    window.alert("Message sent successfully.");
                                })
                                .catch(function () {
                                    window.alert(
                                        "Something went wrong.\n SMS not sent"
                                    );
                                    // window.recaptchaVerifier.render().then(function (widgetId) {
                                    //     grecaptcha.reset(widgetId);
                                    // });
                                });
                        })
                    }).catch(function () {
                        window.alert("Something went wrong. Please try again");
                        window.alert("3");
                    });
            } else {
                $("#errorUserMsg").show();
                return false;
            }
        }).catch(function () {
            window.alert("Something went wrong. Please try again");
            window.alert("4");
        });
}


//function to generate OTP

//       });
//     });
// }
//function for otp verification
function verifyCode() {
    var code = document.getElementById("verCode").value;
    window.alert("5");
    confirmationResult
        .confirm(code)
        .then(function () {
            window.alert("6");
            var en_no = document.getElementById("en_no").value;
            var newUserRef = userRef.doc(en_no);
            var newPassword = document.getElementById("newPassword").value;
            var temp = newUserRef.update({
                Password: newPassword
            }).then(function () {
                window.alert("Document successfully updated!");
                window.location.href = "index.html";
            }).catch(function (error) {
                // The document probably doesn't exist.
                window.alert("Error updating document: ", error);
            });
        })
        .catch(function () {
            window.alert("User couldn't update password (bad verification code?)");
            window.recaptchaVerifier.render().then(function (widgetId) {
                grecaptcha.reset(widgetId);
            });
        });
}
