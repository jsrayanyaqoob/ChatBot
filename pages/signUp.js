import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submit = document.getElementById("submit");

submit.addEventListener("click", (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      alert("Signup successful!");
      window.location = "signIn.html"
    })
    .catch((error) => {
      console.log("Signup error:", error.message);
      alert(error.message); 
    })
})
