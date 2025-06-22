const container = document.querySelector("#mainChatsContainer");
const newChat = document.querySelector("#openNewChat");
const closeBtn = document.querySelector("#closeModalBtn");
const overlay = document.querySelector("#modalOverlay");
const headingChat = document.querySelector("#chatHeadVal")
const confirmed = document.querySelector("#confirmation")


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

  confirmed.addEventListener("click", (e) => {
    if (e.target === confirmed) {
      overlay.classList.add("hidden");
    }
  });

  
})

confirmed.addEventListener('click', () => {
      container.innerHTML = `
        <div>
            <a href="#" class="flex gap-2 items-center text-[14px] cursor-pointer hover:bg-[#3A3A3A] rounded-xl px-3 py-[8px]">
            ${headingChat.value}</a>
        </div>
    `
})


