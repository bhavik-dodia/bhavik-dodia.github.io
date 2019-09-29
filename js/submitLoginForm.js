//validating with database
function submitLoginForm() {
    console.log("33");
    var en_no = document.getElementById("en_no").value;
    var password = document.getElementById("Password").value;
    /* userRef.doc("170050107039").get().then((documentSnapshot) => {
         if (documentSnapshot.exists) {
             console.log("Document exists");
         } else {
             console.log("Document does not exists");
         }
     });*/
    userRef.where("en_no", "==", en_no).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().password != password) {
                /* document.getElementById("errorUserMsg").style.display = none;
                 document.getElementById("errorPasswordMsg").style.display = block;
                 callForm();*/
                console.log("incorrect");
                return false;
            }
            else {
                // document.getElementById("errorPasswordMsg").style.display = none;
                console.log("correct");
            }
        });
    }).catch(function () {
        $("#errorUserMsg").show();
        return false;
    });
}
