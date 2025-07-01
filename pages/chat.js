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


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});