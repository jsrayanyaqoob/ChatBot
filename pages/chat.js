import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { auth, db } from "./firebaseconfig.js"

const container = document.querySelector("#mainChatsContainer");
const newChat = document.getElementById("openNewChat");
const closeBtn = document.querySelector("#closeModalBtn");
const overlay = document.querySelector("#modalOverlay");
const headingChat = document.querySelector("#chatHeadVal")
const confirmed = document.querySelector("#confirmation")


const chatsData = []

newChat.addEventListener('click', () => {

    newChat.addEventListener("click", () => {
    overlay.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
    }
  });
})


const data = confirmed.addEventListener('click', function() {
    var chatTitle = document.getElementById('chatHeadVal').value

    if (chatTitle) {
        var newChat = document.createElement('div');
        newChat.className = 'cursor-pointer hover:bg-[#3A3A3A] rounded-xl px-3 py-[8px] flex items-center gap-2'
        newChat.innerHTML = `<i class="fa-regular fa-message"></i><span class="text-sm">${chatTitle || "Untitled Chat"}</span>`

        container.appendChild(newChat);

        document.getElementById('chatHeadVal').value = '';
        document.getElementById('modalOverlay').classList.add('hidden');
    }
});


async function getInfoFromFirestore(){

  let user;
  const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    user = doc.data()
  });
}


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid; 
    console.log(uid)
    const users = await getInfoFromFirestore()
    console.log(users);
    
  } else {
    window.location = "login.html"
  }
});