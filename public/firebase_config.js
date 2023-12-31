import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , signOut} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyChipnrfoIpnYrzxKA8cHU0hK3t-OOXMCY",
    authDomain: "lab30xc.firebaseapp.com",
    databaseURL: "https://lab30xc-default-rtdb.firebaseio.com",
    projectId: "lab30xc",
    storageBucket: "lab30xc.appspot.com",
    messagingSenderId: "69354827060",
    appId: "1:69354827060:web:f86fc56664a859904c8961",
    measurementId: "G-JMRJ7KSWC4"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const logoutbtn = document.getElementById("logoutbutton");
const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

function checkAuthentication() {
  auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User has access");
    } else {
      window.location.href = 'index.html';
    }
  });
}

console.log("Script loaded successfully");

createacctbtn.addEventListener("click", function() {
  console.log("Create account button clicked");
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      var element = document.getElementById("navigation");
      element.style.display = "block";  // makes thing come back
      window.alert("Success! Account created.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      var element = document.getElementById("navigation");
      element.style.display = "none";  // makes thing go away
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Welcome back!");
      //window.alert("Success! Welcome back!");
      var element = document.getElementById("navigation");
      element.style.display = "block";  // makes thing come back
      var element2 = document.getElementById("loginArea");
      element2.style.display = "none";  // makes login go away
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
      var element = document.getElementById("navigation");
      element.style.display = "none";  // makes thing go away
      var element2 = document.getElementById("loginArea");
      element2.style.display = "block";  // makes login go back
    });
});
logoutbtn.addEventListener("click", function() {
    signOut(auth)
      .then((userCredential) => {
        // Signed out
        const user = userCredential.user;
        var element = document.getElementById("navigation");
        element.style.display = "none";  // makes things go away
        var element2 = document.getElementById("loginArea");
        element2.style.display = "none";  // makes login go away
        window.location.href = "index.html";

      })
      .catch((error) => {
        var element = document.getElementById("navigation");
        element.style.display = "block";  // makes thing go back
        var element2 = document.getElementById("loginArea");
        element2.style.display = "block";  // makes login go back
      });
  });

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});

function checkUserAuthentication() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user); // User is signed in
      } else {
        reject("No user signed in"); // No user is signed in
      }
    });
  });
}

function protectPage() {
  checkUserAuthentication().catch(() => {
    window.location.href = 'index.html'; // Redirect to sign-in page
  });
}