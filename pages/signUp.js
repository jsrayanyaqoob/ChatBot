import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { auth, db } from "./firebaseconfig.js"

const email = document.querySelector("#email");
const fullName = document.querySelector("#full");
const password = document.querySelector("#password");
const submit = document.getElementById("submit");

submit.addEventListener("click", async (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          fullName: fullName.value,
          userUid: user.uid,
        });
        
        console.log("Document written with ID: ", docRef.id);
        window.location = "signIn.html"
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      console.log("Signup error:", error.message);
      alert(error.message); 
    })    


})