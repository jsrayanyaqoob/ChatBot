import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const password = document.querySelector("#passwordForm")
const submit = document.getElementById("submit")
const email = document.querySelector("#emailForm")


submit.addEventListener('click', event => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            window.location = "chat.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });

})
