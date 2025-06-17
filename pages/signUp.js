// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// import { auth } from "../firebaseconfig";

// const password = document.querySelector("#passwordForm")
// const submit = document.querySelector("#submitBtn")
// const email = document.querySelector("#emailForm")
// const fullName = document.querySelector("#fullName")

// submit.addEventListener('click' , event =>{
//     event.preventDefault()
//     console.log(fullName);

//     createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user);
    
//   })
//     .catch((error) => {
//     const errorMessage = error.message;
//     console.log(errorMessage);

//     window.location = "logIn.html"
    
//   });

//     // console.log(fullName.value);
//     console.log(email.value);
//     console.log(password.value);
// })  


import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("Signup successful!");
      // Redirect to a dashboard or login page
      // window.location = "login.html";
    })
    .catch((error) => {
      console.log("Signup error:", error.message);
      alert(error.message); // Show the Firebase error
    });
});
