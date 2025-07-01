import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
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


// const data = confirmed.addEventListener('click', function() {
//     var chatTitle = document.geztElementById('chatHeadVal').value

//     if (chatTitle) {
//         var newChat = document.createElement('div');
//         newChat.className = 'cursor-pointer hover:bg-[#3A3A3A] rounded-xl px-3 py-[8px] flex items-center gap-2'
//         newChat.innerHTML = `<i class="fa-regular fa-message"></i><span class="text-sm">${chatTitle || "Untitled Chat"}</span>`

//         container.appendChild(newChat);

//         document.getElementById('chatHeadVal').value = '';
//         document.getElementById('modalOverlay').classList.add('hidden');
//     }
// });



async function getInfoFromFirestore(){

  let user;
  const q = query(collection(db, "users"), where("userUid", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    user = doc.data()
  });

  return user;
}


async function loadChats(userUid) {
  const chatsRef = collection(db, "users", userUid, "chats");
  const snapshot = await getDocs(chatsRef);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const chatTitle = data.title;

    const chatDiv = document.createElement("div");
    chatDiv.className = 'cursor-pointer hover:bg-[#3A3A3A] rounded-xl px-3 py-[8px] flex items-center gap-2';
    chatDiv.innerHTML = `<i class="fa-regular fa-message"></i><span class="text-sm">${chatTitle}</span>`;
    container.appendChild(chatDiv);
  });
}



onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    await loadChats(uid);
  } else {
    window.location = "login.html";
  }
});
























const chatWindow = document.getElementById("chatWindow");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex items-start gap-3 ${
    sender === "user" ? "justify-end" : "justify-start"
  }`;

  const avatar = document.createElement("img");
  avatar.src = sender === "user" ? "/assets/guest.png" : "/assets/logo.png";
  avatar.className = "w-8 h-8 rounded-full";

  const bubble = document.createElement("div");
  bubble.className = `p-3 max-w-[70%] rounded-2xl text-sm leading-relaxed shadow-md ${
    sender === "user"
      ? "bg-purple-600 text-white rounded-br-none"
      : "bg-[#2c2c2c] text-white rounded-bl-none"
  }`;
  bubble.innerText = text;

  if (sender === "user") {
    wrapper.appendChild(bubble);
    wrapper.appendChild(avatar);
  } else {
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
  }

  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  chatInput.value = "";

  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI";
    addMessage("bot", reply);
  } catch (err) {
    console.error(err);
    addMessage("bot", "❌ Error talking to AI.");
  }
}

sendBtn.addEventListener("click", sendMessage);

// Press Enter to send
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
