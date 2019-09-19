window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('submitButton', {
    'size': 'invisible',
    'callback': function(response) {
  // reCAPTCHA solved, allow signInWithPhoneNumber.
  onSignInSubmit();
}
});

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');